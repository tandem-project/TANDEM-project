package com;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.media.AudioManager;
import android.media.ToneGenerator;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

//import com.icom.location.GPSTracker;
//import com.icom.micsysapplication.MicsysApplication;
import com.frost.mqtttutorial.*;

import java.util.Timer;
import java.util.TimerTask;

//import com.icom.micsysapplication.activities.ShowPairedDevicesActivity;
/*
https://stackoverflow.com/questions/5776851/load-image-from-url
URL url = new URL("http://image10.bizrate-images.com/resize?sq=60&uid=2216744464");
Bitmap bmp = BitmapFactory.decodeStream(url.openConnection().getInputStream());
imageView.setImageBitmap(bmp);

imageView.invalidate();   ??? https://stackoverflow.com/questions/39231711/how-to-process-efficiently-with-imageview-in-a-video-render-case
 */

public class StartUpMenu extends Activity {

    public Context mContext = null;
    public Button findParkingButton,aboutButton,exitButton,showMeasurementsButton,testButton;
    public TextView parkingInfoTextView;
    private ArrayAdapter<String> mBTArrayAdapter;
    private ListView mDevicesListView;
    //private MicsysApplication micsysApplication = null;
    public Timer timer;
    public TimerTask timerTask;
    public ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        /*
         * Tone Generator settings.
         */
        //ToneGenerator toneGenerator = new ToneGenerator(AudioManager.STREAM_NOTIFICATION, 100);
       // toneGenerator.startTone(ToneGenerator.TONE_CDMA_PIP, 150);
        //toneGenerator.startTone(ToneGenerator.TONE_CDMA_ALERT_INCALL_LITE, 150);
       // toneGenerator.startTone(ToneGenerator.TONE_CDMA_ABBR_ALERT,200);//TONE_CDMA_CONFIRM

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        setContentView(R.layout.startup_layout);
        mContext = this;

        findParkingButton          = (Button) findViewById(R.id.findParkingButton);
        aboutButton                = (Button) findViewById(R.id.aboutButton);
        testButton                 = (Button) findViewById(R.id.testButton);
        exitButton                 = (Button) findViewById(R.id.exitButton);
        showMeasurementsButton     = (Button) findViewById(R.id.showMeasurementButton);
        parkingInfoTextView        = (TextView)findViewById(R.id.parkingInfoTextView);
        progressBar                = (ProgressBar)findViewById(R.id.progressBar);
        progressBar.setVisibility(View.INVISIBLE);

        findParkingButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               try{
                   initializeTimerTask();
                   timer = new Timer();
                   mBTArrayAdapter.clear();
                   parkingInfoTextView.setText(" ");
                   //TODO check if timer runs
                   timer.schedule(timerTask, 5000);
                   progressBar.setVisibility(View.VISIBLE);
               }catch(Exception ex){
                   System.out.println("Exception in findParkingButton.setOnClickListener");
               }

            }
        });
        //https://protocoderspoint.com/custom-alert-dialog-popup-android/?utm_content=cmp-true
        aboutButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                 /////
                ImageView cancel;
                Button okButton;
                //will create a view of our custom dialog layout
                View alertCustomdialog = LayoutInflater.from(StartUpMenu.this).inflate(R.layout.custom_dialog,null);
                //initialize alert builder.
                AlertDialog.Builder alert = new AlertDialog.Builder(StartUpMenu.this);

                //set our custom alert dialog to tha alertdialog builder
                alert.setView(alertCustomdialog);
                cancel   = (ImageView)alertCustomdialog.findViewById(R.id.cancel_button);
                okButton = (Button)alertCustomdialog.findViewById(R.id.ok_button);
                final AlertDialog dialog = alert.create();
                //this line removed app bar from dialog and make it transperent and you see the image is like floating outside dialog box.
                dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
                //finally show the dialog box in android all
                dialog.show();
                cancel.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        dialog.dismiss();
                    }
                });

                okButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        dialog.dismiss();
                    }
                });
                /////

            }
        });

        showMeasurementsButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                //Intent intent = new Intent(mContext, ShowAllMeasurements.class);
                //startActivity(intent);
            }
        });


        testButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                //Intent intent = new Intent(mContext, com.icom.af3resqueapp.MainActivity.class);
                //startActivity(intent);
            }
        });

        exitButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                finish();
            }
        });

        /*
         * ADD GPS ????
         */
       // GPSTracker gpsTracker = new GPSTracker(this);
        //micsysApplication = MicsysApplication.getInstance();
       // aF3HealthMonitorPreferencesManager  = aF3HealthMonitorApplication.getPreferenceManager();
        //micsysApplication.setGPSTracker(gpsTracker);

        mBTArrayAdapter = new ArrayAdapter<String>(this,R.layout.list_item);
       // mBTAdapter      = BluetoothAdapter.getDefaultAdapter(); // get a handle on the bluetooth radio

        mDevicesListView = (ListView)findViewById(R.id.parkingListView);
        mDevicesListView.setAdapter(mBTArrayAdapter); // assign model to view
        mDevicesListView.setOnItemClickListener(mDeviceClickListener);


        //initializeTimerTask();
        //timer = new Timer();
        //new Timer().schedule(timerTask, 5000);
        ///////////////
        //mBTArrayAdapter.add("Intracom Telecom A5 parking" + "\n" + "13.7 km Markopoulou Avenue");

        /////////////
    }//end
    //--------------------------------------------------------------------------------------------
    public void initializeTimerTask() {

        timerTask = new TimerTask() {
            public void run() {

                runOnUiThread (new Thread(new Runnable() {

                    public void run() {
                            progressBar.setVisibility(View.INVISIBLE);
                            parkingInfoTextView.setText("Found 1 Parking site");
                            mBTArrayAdapter.add("Intracom Telecom A5 parking" + "\n" + "13.7 km Markopoulou Avenue");
                            try {
                                Thread.sleep(300);
                            }
                            catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                    }
                }));
            }
        };
    }//end
    //---------------------------------------------------------------------------------------------
    public void startTimer() {
        //set a new Timer
        timer = new Timer();

        //initialize the TimerTask's job
        initializeTimerTask();

        //schedule the timer, after the first 5000ms the TimerTask will run every 10000ms
        timer.schedule(timerTask, 5000, 10000); //
    }
    //------------------------------------------------------------------
    private AdapterView.OnItemClickListener mDeviceClickListener = new AdapterView.OnItemClickListener() {
        public void onItemClick(AdapterView<?> av, View v, int arg2, long arg3) {
          /*
             * Get the device MAC address, which is the last 17 chars in the View
             */
            String info = ((TextView) v).getText().toString();
            //final String address = info.substring(info.length() - 17);
            //final String name    = info.substring(0,info.length() - 17);

            Intent intent = new Intent(mContext, MainActivity.class);
            //intent.putExtra("DEVICE_NAME", name);
            //intent.putExtra("DEVICE_ADDRESS", address);
            startActivity(intent);
        }
    };
}//end of class
