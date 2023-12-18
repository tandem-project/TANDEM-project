package TANDEM.icomtelecom.user_catalogue.aam;

import TANDEM.icomtelecom.user_catalogue.Model.User.User;
import TANDEM.icomtelecom.user_catalogue.Model.aam.AamActions;
import TANDEM.icomtelecom.user_catalogue.Model.aam.AamRolesActions;
import TANDEM.icomtelecom.user_catalogue.Model.aam.AamToken;
import TANDEM.icomtelecom.user_catalogue.Repositories.UserRepository;
import TANDEM.icomtelecom.user_catalogue.Repositories.aam.ActionsRepository;
import TANDEM.icomtelecom.user_catalogue.Repositories.aam.RolesActionsRepository;
import TANDEM.icomtelecom.user_catalogue.Repositories.aam.TokenRepository;
import org.json.JSONObject;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.security.SecureRandom;
import java.util.*;

public class AamFactory {
    private MongoTemplate mongoTemplate;
    private UserRepository userRepository;
    private TokenRepository tokenRepository;
    private RolesActionsRepository rolesActionsRepository;
    private ActionsRepository actionsRepository;

    private String _MESSAGE_NO_USER = "";
    private String _MESSAGE_MANY_USERS = "";
    private String _MESSAGE_WRONG_PASSWORD = "";
    private  final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private  final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe
    public AamFactory(
            MongoTemplate mongoT,
UserRepository userRep,
TokenRepository tokenRep,
RolesActionsRepository rolesActionsRep,
ActionsRepository actionsRep){
        mongoTemplate = mongoT;
        userRepository = userRep;
        tokenRepository = tokenRep;
        rolesActionsRepository = rolesActionsRep;
        actionsRepository = actionsRep;
    }
    public JSONObject getMessage(int sts, JSONObject jans){
        JSONObject jo = new JSONObject();
        jo.put("status",sts);
        jo.put("response",jans);
        return jo;
    }
    public AamRolesActions getRolesActionsFromJson(JSONObject jo){
        AamRolesActions aCtions = new AamRolesActions();
        aCtions.setServices(jo.getString("services"));
        aCtions.setActions(jo.getString("actions"));
        aCtions.setUserRole(jo.getString("role"));
        rolesActionsRepository.save(aCtions);
        return aCtions;
    }
    public User getUserFromJson(JSONObject jo){
        User aUser = new User();
        if (jo.has("userid"))
            aUser.setUserId(jo.getString("userid"));
        aUser.setUserName(jo.getString("username"));
        aUser.setUserRole(jo.getString("role"));
        aUser.setUserFirstName(jo.getString("firstname"));
        aUser.setUserLastName(jo.getString("lastname"));
        aUser.setUserPassword(jo.getString("password"));
        aUser.setUserCompanyName(jo.getString("company"));
        userRepository.save(aUser);
        return aUser;
    }
    public AamActions getActionFromJson(JSONObject jo){
        AamActions aamActions = new AamActions();
        aamActions.setOrder(jo.getInt("order"));
        aamActions.setType(jo.getInt("type"));
        aamActions.setName(jo.getString("name"));
        aamActions.setDescription(jo.getString("description"));
        aamActions.setValue(jo.getString("value"));
        actionsRepository.save(aamActions);
        return aamActions;
    }
    public   String createToken(){
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }
    private  long moveMillsBack(long mills){
        Date dt = new Date();
        long tm = dt.getTime();
        long timebef = tm - mills;
        return timebef;
    }
    public   void removeOld(){
        Date today = new Date();
        Query query = new Query();
        long newtime = moveMillsBack(AamConfig.getExPeriod()*10);
        query.addCriteria(Criteria.where("time").lt(newtime));
        mongoTemplate.findAllAndRemove(query, User.class);
    }
    public String checkAuthExp(String token){
        try {
            String ret = getGuiUser(token, null);
            JSONObject jobj = new JSONObject(ret);
            if (jobj.getInt("status") != 200) return jobj.toString();
            Long tokenTime = jobj.getJSONObject("result").getLong("time");
            long tm = moveMillsBack(AamConfig.getExPeriod());// to be configurable
            if (tokenTime.longValue()<tm){
                jobj = new JSONObject().put("status",401).put("result",new JSONObject().put("access",false).put("reason","token expired"));
                return jobj.toString();
            }
            else
                jobj = new JSONObject().put("status",200).put("result",new JSONObject().put("access",true));
            ret = jobj.toString();
        }catch(Exception e){
            e.printStackTrace();
        }
        JSONObject jobj = new JSONObject().put("status",401).put("result",new JSONObject().put("access",false).put("reason","token expired"));
        return jobj.toString();
    }
    public String checkAuth(String token, String actionname){
        String ret = "";
        try{
            ret = getGuiUser(token, actionname);
            JSONObject jobj = new JSONObject(ret);
            if (jobj.getInt("status")!=200) return jobj.toString();
            int order = jobj.getJSONObject("result").getInt("order");
            String actions = jobj.getJSONObject("result").getString("actions");
            Long tokenTime = jobj.getJSONObject("result").getLong("time");
            String ch = "0";
            if (order==actions.length())
                ch = actions.substring(order);
            else if (order<actions.length())
                ch = actions.substring(order,order+1);
            else if (order>actions.length()) {
                jobj = new JSONObject().put("status", 403).put("result", new JSONObject().put("access", false).put("reason", "action not configured"));
                return jobj.toString();
            }
            if (ch.equals("1")){
                long tm = moveMillsBack(AamConfig.getExPeriod());// to be configurable
                if (tokenTime.longValue()<tm){
                    jobj = new JSONObject().put("status",401).put("result",new JSONObject().put("access",false).put("reason","token expired"));
                    return jobj.toString();
                }
                else
                jobj = new JSONObject().put("status",200).put("result",new JSONObject().put("access",true));
            }else{
                jobj = new JSONObject().put("status",402).put("result",new JSONObject().put("access",false).put("reason","not authorized user"));
                return jobj.toString();
            }
            ret = jobj.toString();
        }catch(Exception e){
            ret = new JSONObject().put("status",404).put("result",new JSONObject().put("access",false).put("reason",e.getMessage())).toString();
        }
        //token = tokenRefresh(token);
        return ret;
    }
    public String tokenRefresh(String token){
        String ret = "";
        try {
            ret = checkAuth(token,null);
            JSONObject jo = new JSONObject(ret);
            if (jo.getInt("status")!=200){
                return jo.toString();
            }
            Query query = new Query();
            query.addCriteria(Criteria.where("token").is(token));
            List<AamToken> tokenlst = mongoTemplate.find(query, AamToken.class);
            AamToken aToken = tokenlst.get(0);
            long tm = new Date().getTime();
            aToken.setTime(tm);
            tokenRepository.save(aToken);
            ret = new JSONObject().put("status",200).put("result",new JSONObject().put("info","expire period refreshed")).toString();
        }catch(Exception e){
            ret = new JSONObject().put("status",400).put("result",new JSONObject().put("reason",e.getMessage())).toString();
        }
        return ret;
    }
    public   String getGuiUser(String token, String actionName){
        JSONObject jo = new JSONObject();
        try{
            Query query = new Query();
            query.addCriteria(Criteria.where("token").is(token));
            List<AamToken> tokenlst = mongoTemplate.find(query, AamToken.class);
            AamToken aToken = tokenlst.get(0);
            long tokenTime = aToken.getTime();

            User aUser = null;
            query = new Query();
            query.addCriteria(Criteria.where("userName").is(aToken.getUserName()));
            List<User> usrlst = mongoTemplate.find(query, User.class);
            //List<User> usrlst = userRepository.findUserByProperties(null,null,aToken.getUserName(),null,null,null,null);
            aUser = usrlst.get(0);

            query = new Query();
            query.addCriteria(Criteria.where("userRole").is(aUser.getUserRole()));
            List<AamRolesActions> glst = mongoTemplate.find(query, AamRolesActions.class);
            AamRolesActions rolesActions = glst.get(0);

            int order = -1;
            boolean actionsflg = true;
            if (actionName!=null){
                if (actionName.startsWith("f")) actionsflg = false;
                query = new Query();
                query.addCriteria(Criteria.where("name").is(actionName));
                List<AamActions> actionlst = mongoTemplate.find(query, AamActions.class);
                if (actionlst.size()==0){
                    jo = new JSONObject().put("status",500).put("result","action not found");
                    return jo.toString();
                }
                AamActions aCtion = actionlst.get(0);
                order = aCtion.getOrder();

            }
            jo = new JSONObject().put("status",200).put("result",
                    new JSONObject().put("token",token).put("username",aUser.getUserName())
                            .put("userfirstname",aUser.getUserFirstName())
                            .put("userlastname",aUser.getUserLastName())
                            .put("name",aUser.getUserName())
                            .put("role",aUser.getUserRole())
                            .put("order",order)
                            .put("time",tokenTime)
                            .put("company",aUser.getUserCompanyName())
                            .put("actions",(actionsflg)?rolesActions.getActions():rolesActions.getServices()));

        }catch(Exception e){
            jo = getMessage(400,new JSONObject().put("error",e.getMessage()));
        }

        return jo.toString();
    }
    public   String login(String usrnm, String psw){
        JSONObject jo = new JSONObject();
        try{
            Query query = new Query();
            query.addCriteria(Criteria.where("userName").is(usrnm));
            List<User> usrlst = mongoTemplate.find(query, User.class);

            //List<User> usrlst = userRepository.findUserByProperties(null,null,usrnm,null,null,null,null);
            if ((usrlst==null)||(usrlst.size()==0)){
                jo = getMessage(400,new JSONObject().put("error",_MESSAGE_NO_USER));
                return jo.toString();
            }
            if ((usrlst==null)||(usrlst.size()>1)){
                jo = getMessage(401,new JSONObject().put("error",_MESSAGE_MANY_USERS));
                return jo.toString();
            }
            User usr = usrlst.get(0);
            if (!psw.equals(usr.getUserPassword())){
                jo = getMessage(402,new JSONObject().put("error",_MESSAGE_WRONG_PASSWORD));
                return jo.toString();
            }
            String tokenVal = createToken();
            Date dt = new Date();
            long ml = dt.getTime();

            AamToken aToken = new AamToken();
            aToken.setToken(tokenVal);
            aToken.setUserName(usrnm);
            aToken.setUserRole(usr.getUserRole());
            aToken.setTime(ml);
            tokenRepository.save(aToken);
            //jo = getMessage(200,new JSONObject().put("token",tokenVal));
            jo = new JSONObject().put("status",200).put("result",
                    new JSONObject().put("token",tokenVal).put("username",usr.getUserName())
                            .put("userfirstname",usr.getUserFirstName())
                            .put("userlastname",usr.getUserLastName())
                            .put("name",usr.getUserName())
                            .put("role",usr.getUserRole())
                    .put("company",usr.getUserCompanyName())
            );
            removeOld();
        }catch(Exception e){
            jo = getMessage(410,new JSONObject().put("error",e.getMessage()));
            return jo.toString();
        }

        return jo.toString();
    }
}
