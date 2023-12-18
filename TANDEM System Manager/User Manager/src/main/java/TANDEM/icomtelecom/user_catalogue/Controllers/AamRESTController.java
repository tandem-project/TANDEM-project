package TANDEM.icomtelecom.user_catalogue.Controllers;

import TANDEM.icomtelecom.user_catalogue.Model.User.User;
import TANDEM.icomtelecom.user_catalogue.Model.aam.AamActions;
import TANDEM.icomtelecom.user_catalogue.Model.aam.AamCompany;
import TANDEM.icomtelecom.user_catalogue.Model.aam.AamRolesActions;
import TANDEM.icomtelecom.user_catalogue.Repositories.aam.ActionsRepository;
import TANDEM.icomtelecom.user_catalogue.Repositories.aam.RolesActionsRepository;
import TANDEM.icomtelecom.user_catalogue.Repositories.aam.TokenRepository;
import TANDEM.icomtelecom.user_catalogue.Repositories.UserRepository;
import TANDEM.icomtelecom.user_catalogue.aam.AamConfig;
import TANDEM.icomtelecom.user_catalogue.aam.AamFactory;
import TANDEM.icomtelecom.user_catalogue.aam.Tester;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("usercatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")

public class AamRESTController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private RolesActionsRepository rolesActionsRepository;
    @Autowired
    private ActionsRepository actionsRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @GetMapping("/aam/getActions")
    public List<AamActions> RESTgetActions(
            //@RequestHeader(value="AAM-Authorization") String tokenHeader
    ) {
        /*String tmp1 = new AamFactory(
                mongoTemplate,
                userRepository,
                tokenRepository,
                rolesActionsRepository,
                actionsRepository
        ).checkAuth(tokenHeader, "f.aam.getactions");
        JSONObject jtmp1 = new JSONObject(tmp1);
        if (jtmp1.getInt("status")!=200) return null;*/
        Query query = new Query();
        query.addCriteria(Criteria.where("type").is(0))
                .with(Sort.by(Sort.Direction.ASC, "order"));
        List<AamActions> actionlist = mongoTemplate.find(query,AamActions.class);
/*        JSONArray acar = new JSONArray();
        for (int i=0;i<actionlist.size();i++){
            AamActions actions = actionlist.get(i);
            acar.put(actions.getValue());
        }*/
        return actionlist;
    }
    @GetMapping("/aam/getGuiActions")
    public String RESTgetGuiActions(
            //@RequestHeader(value="AAM-Authorization") String tokenHeader
    ) {
        /*String tmp1 = new AamFactory(
                mongoTemplate,
                userRepository,
                tokenRepository,
                rolesActionsRepository,
                actionsRepository
        ).checkAuth(tokenHeader, "f.aam.getactions");
        JSONObject jtmp1 = new JSONObject(tmp1);
        if (jtmp1.getInt("status")!=200) return null;*/
        Query query = new Query();
        query.addCriteria(Criteria.where("type").is(0))
                .with(Sort.by(Sort.Direction.ASC, "order"));
        List<AamActions> actionlist = mongoTemplate.find(query,AamActions.class);
        JSONArray acar = new JSONArray();
        for (int i=0;i<actionlist.size();i++){
            AamActions actions = actionlist.get(i);
            acar.put(actions.getValue());
        }
        return acar.toString();
    }
    @GetMapping("/aam/getCompanies")
    public List<AamCompany> RESTgetCompanies(
            //@RequestHeader(value="AAM-Authorization") String tokenHeader
    ) {
        return mongoTemplate.findAll(AamCompany.class);
    }
    @GetMapping("/aam/getRoles")
    public List<AamRolesActions> RESTgetRoles(
            //@RequestHeader(value="AAM-Authorization") String tokenHeader
    ) {
/*        String tmp1 = new AamFactory(
                mongoTemplate,
                userRepository,
                tokenRepository,
                rolesActionsRepository,
                actionsRepository
        ).checkAuth(tokenHeader, "f.aam.getroles");
        JSONObject jtmp1 = new JSONObject(tmp1);
        if (jtmp1.getInt("status")!=200) return null;*/
        return mongoTemplate.findAll(AamRolesActions.class);
    }
    @PostMapping("/aam/login")
    public String RESTlogin(@RequestBody String postInfo){
        String ret = "";
        try{
            JSONObject jobj = new JSONObject(postInfo);
            ret = new AamFactory(
                    mongoTemplate,
                    userRepository,
                    tokenRepository,
                    rolesActionsRepository,
                    actionsRepository
            ).login(jobj.getString("usrnm"),
                    jobj.getString("psw"));
        }catch(Exception e){
            ret = e.getMessage();
        }
        return ret;
    }
    @GetMapping("/aam/get/gui/user")
    public String RESTgetGuiUser(@RequestHeader(value="AAM-Authorization") String tokenHeader){
        String ret = "";
        try{
            String tmp1 = new AamFactory(
                    mongoTemplate,
                    userRepository,
                    tokenRepository,
                    rolesActionsRepository,
                    actionsRepository
            ).checkAuthExp(tokenHeader);// check token expiration
            JSONObject jtmp1 = new JSONObject(tmp1);
            if (jtmp1.getInt("status")!=200) return tmp1;

            ret = new AamFactory(
                    mongoTemplate,
                    userRepository,
                    tokenRepository,
                    rolesActionsRepository,
                    actionsRepository
            ).getGuiUser(tokenHeader,null);
        }catch(Exception e){
            ret = e.getMessage();
        }
        return ret;
    }
    @GetMapping("/aam/token/refresh")
    public String RESTtokenRefresh(@RequestHeader(value="AAM-Authorization") String tokenHeader){
        String ret = "";
        try{
            ret = new AamFactory(
                    mongoTemplate,
                    userRepository,
                    tokenRepository,
                    rolesActionsRepository,
                    actionsRepository
            ).tokenRefresh(tokenHeader);
        }catch(Exception e){
            ret = e.getMessage();
        }
        return ret;
    }
    @PostMapping("/aam/check/auth")
    public String RESTcheckAuth(@RequestBody String postInfo){
        String ret = "";
        try{
            JSONObject jobj = new JSONObject(postInfo);
            ret = new AamFactory(
                    mongoTemplate,
                    userRepository,
                    tokenRepository,
                    rolesActionsRepository,
                    actionsRepository
            ).checkAuth(jobj.getString("token"), jobj.getString("actionname"));
        }catch(Exception e){
            ret = new JSONObject().put("status",404).put("result",new JSONObject().put("access",false).put("reason",e.getMessage())).toString();
        }
        return ret;
    }
    @GetMapping("/aam/testme")
    public String RESTtestme(){
        String ret = "";
        try{
            ret = new Tester(mongoTemplate).testme();
        }catch(Exception e){
            ret = e.getMessage();
        }
        return ret;
    }
    @PostMapping("/aam/update/config")
    public String RESTupdateConfig(@RequestHeader(value="AAM-Authorization") String tokenHeader,@RequestBody String postInfo){
        JSONObject jobj = new JSONObject(postInfo);
        if (jobj.has("url")) AamConfig.setBackEndUrl(jobj.getString("url"));
        if (jobj.has("period")) AamConfig.setExPeriod(jobj.getLong("period"));
        return "";
    }
    @PostMapping("/aam/add/documents")
    public String RESTaddDocuments(
            //@RequestHeader(value="AAM-Authorization") String tokenHeader,
            @RequestBody String postInfo){
        String ret = "";
        try{
/*            String tmp1 = new AamFactory(
                    mongoTemplate,
                    userRepository,
                    tokenRepository,
                    rolesActionsRepository,
                    actionsRepository
            ).checkAuth(tokenHeader, "f.aam.add.documents");
            JSONObject jtmp1 = new JSONObject(tmp1);
            if (jtmp1.getInt("status")!=200) return tmp1;
*/
            JSONObject jobj = new JSONObject(postInfo);
            String docname = jobj.getString("doc");
            if (docname.equals("rolesactions")) rolesActionsRepository.deleteAll();
            if (docname.equals("users")) userRepository.deleteAll();
            if (docname.equals("actions")) actionsRepository.deleteAll();
            JSONArray jsa = jobj.getJSONArray("info");
            for (int i = 0; i < jsa.length(); i++) {
                JSONObject tmpj = jsa.getJSONObject(i);
                if (docname.equals("rolesactions")) {
                    AamRolesActions aCtions = new AamFactory(
                            mongoTemplate,
                            userRepository,
                            tokenRepository,
                            rolesActionsRepository,
                            actionsRepository
                    ).getRolesActionsFromJson(tmpj);
                    ret += "role=" + aCtions.getUserRole() + ",";
                }
                if (docname.equals("users")) {
                    User aUser = new AamFactory(
                            mongoTemplate,
                            userRepository,
                            tokenRepository,
                            rolesActionsRepository,
                            actionsRepository
                    ).getUserFromJson(tmpj);
                    ret += "user=" + aUser.getUserName() + ",";
                }
                if (docname.equals("actions")) {
                    AamActions aamActions = new AamFactory(
                            mongoTemplate,
                            userRepository,
                            tokenRepository,
                            rolesActionsRepository,
                            actionsRepository
                    ).getActionFromJson(tmpj);
                    ret += "user=" + aamActions.getName() + ",";
                }
            }

        }catch(Exception e){
            ret = e.getMessage();
        }
        return ret;
    }
    ////////////////////////////

}
