package com.frost.mqtttutorial;

import android.app.Activity;
import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageSwitcher;
import android.widget.ImageView;
import android.widget.TextView;

import com.BufferDescriptor;
import com.BufferDescriptorsTable;
import com.github.mikephil.charting.charts.LineChart;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import helpers.ChartHelper;
import helpers.MqttHelper;

public class MainActivity extends AppCompatActivity {

    MqttHelper mqttHelper;
   // ChartHelper mChart;
   // LineChart chart;

    TextView dataReceived;
    ImageView frameImageView;
    public Bitmap[] bitmapArray = new Bitmap[10];

    public String[] parkingInfo = new String[10];
    public String[] frameURL    = new String[10];
    public int frameIndex = 0;
    public BufferDescriptorsTable bufferDescriptorsTable = null;
    public Thread smartParkingThread =null;
    public Bitmap frameConnectionLostBitmap = null;
    public FrameThread frameThread = null;
    public int pollingTime = 2000;
    public Context context = null;

    ///////////////////////// TO RENDER IMAGE ///////////////////////

    /*
     https://stackoverflow.com/questions/5776851/load-image-from-url
     URL url = new URL("http://image10.bizrate-images.com/resize?sq=60&uid=2216744464");
     Bitmap bmp = BitmapFactory.decodeStream(url.openConnection().getInputStream());
     imageView.setImageBitmap(bmp);
     imageView.invalidate();   ??? https://stackoverflow.com/questions/39231711/how-to-process-efficiently-with-imageview-in-a-video-render-case

     Bitmap mBitmap;

private void someMethod(){

    if(mBitmap == null || !isBitmapSizeOk(mBitmap)){
        if(mBitmap != null) mBitmap.recycle();

        mBitmap = Bitmap.createBitmap(1280, 720, Bitmap.Config.ARGB_8888);
        // call it only when the Bitmap instance changes
        imageView.setImageBitmap(mBitmap);
    }

    mBitmap.copyPixelsFromBuffer(ByteBuffer.wrap(data));

    // Step 3: draw the bitmap
    imageView.post(new Runnable() {

        @Override
        public void run(){
            imageView.invalidate();
        }
    });
}

 */
    ////////////////////////////////////////////////////////////////

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        context = this;

        ///////////////////////
        //https://stackoverflow.com/questions/6343166/how-can-i-fix-android-os-networkonmainthreadexception
         StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
         StrictMode.setThreadPolicy(policy);
        //////////////////////

        dataReceived   = (TextView) findViewById(R.id.dataReceived);
        //chart          = (LineChart) findViewById(R.id.chart);
        //mChart         = new ChartHelper(chart);
        frameImageView = (ImageView)findViewById(R.id.frameImageView);
        bitmapArray[0] = getBitmapFromAsset(this, "frame1.jpg");
        bitmapArray[1] = getBitmapFromAsset(this, "frame2.jpg");
        bitmapArray[2] = getBitmapFromAsset(this, "frame3.jpg");
        bitmapArray[3] = getBitmapFromAsset(this, "frame4.jpg");
        bitmapArray[4] = getBitmapFromAsset(this, "frame5.jpg");
        bitmapArray[5] = getBitmapFromAsset(this, "frame6.jpg");
        bitmapArray[6] = getBitmapFromAsset(this, "frame7.jpg");
        bitmapArray[7] = getBitmapFromAsset(this, "frame8.jpg");
        bitmapArray[8] = getBitmapFromAsset(this, "frame9.jpg");
        bitmapArray[9] = getBitmapFromAsset(this, "frame10.jpg");

        parkingInfo[0] = "Parking Info 1";
        parkingInfo[1] = "Parking Info 2";
        parkingInfo[2] = "Parking Info 3";
        parkingInfo[3] = "Parking Info 4";
        parkingInfo[4] = "Parking Info 5";
        parkingInfo[5] = "Parking Info 6";
        parkingInfo[6] = "Parking Info 7";
        parkingInfo[7] = "Parking Info 8";
        parkingInfo[8] = "Parking Info 9";
        parkingInfo[9] = "Parking Info 10";
        //frameImageView.setImageBitmap(bitmapArray[0]);

        frameURL[0] = "https://www.xxx.gr/tandem/frame1.jpg";
        frameURL[1] = "https://www.xxx.gr/tandem/frame2.jpg";
        frameURL[2] = "https://www.xxx.gr/tandem/frame3.jpg";
        frameURL[3] = "https://www.xxx.gr/tandem/frame4.jpg";
        frameURL[4] = "https://www.xxx.gr/tandem/frame5.jpg";
        frameURL[5] = "https://www.xxx.gr/tandem/frame6.jpg";
        frameURL[6] = "https://www.xxx.gr/tandem/frame7.jpg";
        frameURL[7] = "https://www.xxx.gr/tandem/frame8.jpg";
        frameURL[8] = "https://www.xxx.gr/tandem/frame9.jpg";
        frameURL[9] = "https://www.xxx.gr/tandem/frame10.jpg";

        frameConnectionLostBitmap =   getBitmapFromAsset(this, "frame_connection_lost.jpg");

        bufferDescriptorsTable = new BufferDescriptorsTable();

        ////////////////////////////////////////////////////////////
        try {
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, new TrustManager[]{new X509TrustManager() {
                @Override
                public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                }

                @Override
                public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                    // Accept all certificates, including mismatched hostnames
                }

                @Override
                public X509Certificate[] getAcceptedIssuers() {
                    return new X509Certificate[0];
                }
            }}, new SecureRandom());

            HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
        } catch (Exception e) {
            e.printStackTrace();
        }


        ///////////////////////////////////////////////////////////
        /*OkHttpClient client = new OkHttpClient.Builder()
                .hostnameVerifier(new HostnameVerifier() {
                    @Override
                    public boolean verify(String hostname, SSLSession session) {
                        HostnameVerifier hv = HttpsURLConnection.getDefaultHostnameVerifier();
                        return true;
                    }
                })
                .connectTimeout(100, TimeUnit.SECONDS)
                .readTimeout(100, TimeUnit.SECONDS).build();*/
        ////////////////////////////////////////////////////


       /*smartParkingThread = new Thread(new Runnable() {
            public void run() {

                while(true){
                    BufferDescriptor bufferDescriptor = bufferDescriptorsTable.getNextFullBufferDescriptorToRead();
                    Bitmap bitmap = bufferDescriptor.bitmap;
                    String smartParkingInfoString = bufferDescriptor.parkingInfo;

                    frameImageView.setImageBitmap(bitmap);
                }
                // a potentially time consuming task
                //final Bitmap bitmap = processBitMap("image.png");
                /*
                 * Get next buffer descriptor to read
                 */



               /* frameImageView.post(new Runnable() {
                    public void run() {
                        frameImageView.setImageBitmap(bitmap);
                    }
                });*/
         /*   }//run
        }).start();*/
         /*
         * Create and run smartParking Scheduler
         */

       try {
           InputStream inputStream = context.getAssets().open("certificate.pem"); // replace with your certificate file
           CertificateFactory certificateFactory = CertificateFactory.getInstance("X.509");
           X509Certificate certificate = (X509Certificate) certificateFactory.generateCertificate(inputStream);
       }catch(Exception ex){
           System.out.println("zzz Exception for certification");
       }

        // Disable hostname verification
        HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier() {
            @Override
            public boolean verify(String hostname, SSLSession session) {
                return true; // Allow all hostnames
            }
        });
// Use the certificate in your network connection setup



        startMqtt();
       // frameThread = new FrameThread();
      //  frameThread.startThread();

        //////////////////////////////TEST CODE, REMOVE IT ///////////////////////
        /*try {
            BufferDescriptor bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            URL url = new URL("https://10.124.35.24/smart-city-001.jpg");
            bufferDescriptor.fill(parkingInfo[0],url.toString(),null);

            bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            bufferDescriptor.fill(parkingInfo[1],url.toString(),null);

            bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            bufferDescriptor.fill(parkingInfo[2],url.toString(),null);

            bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            bufferDescriptor.fill(parkingInfo[3],url.toString(),null);

            bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            bufferDescriptor.fill(parkingInfo[4],url.toString(),null);

            bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            bufferDescriptor.fill(parkingInfo[5],url.toString(),null);

            bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            bufferDescriptor.fill(parkingInfo[6],url.toString(),null);

            bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            bufferDescriptor.fill(parkingInfo[7],url.toString(),null);

            bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            bufferDescriptor.fill(parkingInfo[8],url.toString(),null);

            bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();
            bufferDescriptor.fill(parkingInfo[9],url.toString(),null);


        }catch(Exception ex){
            System.out.println("zzz Exception in adding to buffer descriptor");
        }*/
        ////////////////////////////////////////////////////////////////////////
    }//end
//---------------------------------------------------------------------------------------
    private void startMqtt(){
        mqttHelper = new MqttHelper(getApplicationContext());
        mqttHelper.mqttAndroidClient.setCallback(new MqttCallbackExtended() {
            @Override
            public void connectComplete(boolean b, String s) {
                Log.w("Debug","Connected");
            }

            @Override
            public void connectionLost(Throwable throwable) {
              System.out.println("Connection Lost");
            }//end
//--------------------------------------------------------------------------------------
            @Override
            public void messageArrived(String topic, MqttMessage mqttMessage) throws Exception {
                Log.w("Debug",mqttMessage.toString());
                Log.w("Debug","messageArrived");
                String payload = mqttMessage.getPayload().toString();
                Log.w("Debug","zzz payload " + payload);
                //dataReceived.setText(mqttMessage.toString());

                ////////////////////////////////////////////////
                byte[] payload1 = mqttMessage.getPayload();

// Convert the byte array to a String if needed
                String payloadString = new String(payload1, StandardCharsets.UTF_8);
                Log.w("Debug","zzz payloadString " + payloadString);
                ////////////////////////////////////////////////////////////////////

                // mChart.addEntry(Float.valueOf(mqttMessage.toString()));
                if(frameIndex == bitmapArray.length-1)
                    frameIndex = 0;
                else
                    frameIndex++;


                /////////////////////////////////////////////
                runOnUiThread (new Thread(new Runnable() {
                    public void run() {
                        try {
                            System.out.println("zzz1 1");
                            URL url = new URL(payloadString);//"https://10.124.35.24/smart-city-001.jpg");/tandem/frame4.jpg");
                            System.out.println("zzz1 2");
                            Bitmap bmp = BitmapFactory.decodeStream(url.openConnection().getInputStream());
                            System.out.println("zzz1 3");
                            frameImageView.setImageBitmap(bmp);
                            System.out.println("zzz1 4");
                            frameImageView.invalidate();
                            System.out.println("zzz1 5");
                        }catch(Exception ex){
                            System.out.println("zzz1 Exception111");
                            System.out.println("zzz1 " + ex.getMessage());
                            System.out.println("zzz1 " + ex.getLocalizedMessage());
                            System.out.println("zzz1 " + ex.toString());
                            System.out.println("zzz1 " + ex.getCause().getMessage());
                            //bmp = frameConnectionLostBitmap;
                        }
                    }
                }));


                /////////////////////////////////////////////

                /*
                 * Find next empty buffer descriptor.
                 */
                BufferDescriptor bufferDescriptor = bufferDescriptorsTable.getNextEmptyBufferDescriptorToFill();

                if(bufferDescriptor != null){

                    URL url    = new URL(payloadString);//temporary the mqtt message has the url of image only
                    Bitmap bmp = null;


                    System.out.println("CCCC Get bufferdescriptor with id: " + bufferDescriptor.index);
                    /*
                     * Add here the String parking info and the url of frame.
                     * The 2 strings are the parsing results from ,mqttMessage.toString()
                     * TODO parse the ,mqttMessage.toString() and find the parkingInfoString and urlOfFrame
                     * and call:
                     * bufferDescriptor.fill(parkingInfoString,urlOfFrame);//The bitmap is not needed
                     */
                    //bufferDescriptor.fill(parkingInfo[frameIndex],frameURL[frameIndex],bitmapArray[frameIndex]);//bmp/*bitmapArray[frameIndex]*/);

                    bufferDescriptor.fill(parkingInfo[frameIndex],url.toString(),bmp);//bmp/*bitmapArray[frameIndex]*/);
                }else{
                    System.out.println("CCCC failed to get buffer descriptor");
                }

                /*
                 * This will be called inside Thread
                 */
                /*try {
                    dataReceived.setText(parkingInfo[frameIndex]);
                    frameImageView.setImageBitmap(bitmapArray[frameIndex]);
                    frameImageView.invalidate();
                }catch(Exception ex){
                   System.out.println("Exception in message Arrived");
                }*/
            }//end
//-----------------------------------------------------------------------------------
            @Override
            public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

            }
        });
    }//end
//------------------------------------------------------------------------------------
    public void restartConnection(){

        bufferDescriptorsTable.reset();
    }
//------------------------------------------------------------------------------------
public static Bitmap getBitmapFromAsset(Context context, String filePath) {
    AssetManager assetManager = context.getAssets();

    InputStream istr;
    Bitmap bitmap = null;
    try {
        istr   = assetManager.open(filePath);
        bitmap = BitmapFactory.decodeStream(istr);
    } catch (IOException e) {
        // handle exception
        System.out.println("Exception in getBitmapFromAsset");
    }

    return bitmap;
 }//end
//-----------------------------------------------------------------------
public class FrameThread extends Thread{
public boolean running = false;
    @Override
    public void run() {
        while (running) {
            try {
                System.out.println("Thread runnning..");

                BufferDescriptor bufferDescriptor = bufferDescriptorsTable.getNextFullBufferDescriptorToRead();

                //////////////
                //////////////Remove it //////////////////////////////
               /* try {
                    URL url = new URL("https://www..gr/tandem/frame2.jpg"/*"https://10.124.35.24/smart-city-001.jpg"*//*mqttMessage.toString()*///);//temporary the mqtt message has the url of image only
                /*    try {
                       // Bitmap bmp  = BitmapFactory.decodeStream(url.openConnection().getInputStream());
                        frameImageView.setImageBitmap(bitmapArray[2]);
                        frameImageView.invalidate();
                    }catch(Exception ex){
                        System.out.println("Exception in fetching frame from server");

                    }
                }catch(Exception ex){
                    System.out.println("Exception for bmp");
                }*/
                ////////////////////////// This code renders the image https://www..gr/tandem/frame4.jpg ///////
                /*runOnUiThread (new Thread(new Runnable() {
                    public void run() {
                        try {
                            System.out.println("zzz 1");
                            URL url = new URL("https://10.124.35.24/smart-city-001.jpg");//"https://www..gr/tandem/frame4.jpg");
                            System.out.println("zzz 2");
                            Bitmap bmp = BitmapFactory.decodeStream(url.openConnection().getInputStream());
                            System.out.println("zzz 3");
                            frameImageView.setImageBitmap(bmp);
                            System.out.println("zzz 4");
                            frameImageView.invalidate();
                            System.out.println("zzz 5");
                        }catch(Exception ex){
                            System.out.println("zzz Exception111");
                            System.out.println("zzz " + ex.getMessage());
                            System.out.println("zzz " + ex.getLocalizedMessage());
                            System.out.println("zzz " + ex.toString());
                            System.out.println("zzz " + ex.getCause().getMessage());
                        }
}
                }));*/

                //////////////////////////////////////////////////////
                        ////////


                        if(bufferDescriptor!=null) {
                            System.out.println("zzz  bufferdescriptor found to read with id: "+ bufferDescriptor.index);

                            //Bitmap bitmap   = bufferDescriptor.bitmap;//is not needed in the final remove it!!!
                            String frameURL = bufferDescriptor.frameURL;
                            String smartParkingInfoString = bufferDescriptor.parkingInfo;

                            Bitmap bitmap = null;

                            ///////////////////////////////////////////////////////
                            runOnUiThread (new Thread(new Runnable() {
                                public void run() {
                                    try {
                                        System.out.println("zzz 1");
                                        URL url = new URL(frameURL);//"https://10.124.35.24/smart-city-001.jpg");//"https://www..gr/tandem/frame4.jpg");
                                        System.out.println("zzz 2");
                                        Bitmap bmp = BitmapFactory.decodeStream(url.openConnection().getInputStream());
                                        System.out.println("zzz 3");
                                        frameImageView.setImageBitmap(bmp);
                                        System.out.println("zzz 4");
                                        frameImageView.invalidate();
                                        System.out.println("zzz 5");
                                    }catch(Exception ex){
                                        System.out.println("zzz Exception111");
                                        System.out.println("zzz " + ex.getMessage());
                                        System.out.println("zzz " + ex.getLocalizedMessage());
                                        System.out.println("zzz " + ex.toString());
                                        System.out.println("zzz " + ex.getCause().getMessage());
                                        //bmp = frameConnectionLostBitmap;
                                    }
                                }
                            }));
                            //////////////////////////////////////////////////////

                           /* try {
                                System.out.println("CCCC url = " + frameURL);
                                URL url = new URL(frameURL);
                                //bitmap = bitmapArray[frameIndex];
                                /*
                                 * TODO call the next line instead of the previews
                                 */
                                //url.openConnection().
                              /*  bitmap = BitmapFactory.decodeStream(url.openConnection().getInputStream());//THIS we need
                            }catch(Exception ex){
                                System.out.println("CCCC Exception in fetching frame from server");
                                bitmap = frameConnectionLostBitmap;
                            }*/

                            dataReceived.setText(smartParkingInfoString);
                            frameImageView.setImageBitmap(bitmap);
                            //frameImageView.invalidate();
                            bufferDescriptorsTable.updateNextBufferToRead();
                        }else{
                            System.out.println("CCC No bufferdescriptor found to read");
                        }
                        try {
                            Thread.sleep(pollingTime);
                        }
                        catch (InterruptedException e) {
                            e.printStackTrace();
                        }


            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        System.out.println("Thread terminated..");
    }//end
//----------------------------------------------
//--------------------------------------
public void stopThread(){
        this.running = false;
}//end
//--------------------------------------
public void startThread(){
 running = true;
 this.start();

}//end

}//end of class



}//end of class
