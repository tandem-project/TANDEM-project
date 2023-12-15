package com;
/*
 *  * Created by user on 19/7/2021.
 */


 import android.app.Activity;
 import android.content.Intent;
 import android.graphics.Typeface;
 import android.os.Build;
 import android.os.Bundle;
 import android.os.Handler;
 import android.view.View;
 import android.view.animation.Animation;
 import android.view.animation.Animation.AnimationListener;
 import android.view.animation.AnimationUtils;
 import android.widget.ImageView;
 import android.widget.RelativeLayout;
 import android.widget.TextView;

 import com.frost.mqtttutorial.R;


public class LogoActivity extends Activity {

    private Animation animation;
    private ImageView logo;
    private ImageView title_image;
    private ImageView title2;
    private ImageView appNameImage;
    private RelativeLayout relativeLayout = null;
   // public Typeface typeface = null;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        askForFullScreen();
        setContentView(R.layout.activity_logo);

        logo           = (ImageView) findViewById(R.id.logo_img);
        title_image    = (ImageView) findViewById(R.id.track_image);
        title2         = (ImageView) findViewById(R.id.pro_image);
        relativeLayout = (RelativeLayout)findViewById(R.id.root);
        appNameImage   = (ImageView) findViewById(R.id.app_image);
        appNameImage.setVisibility(View.INVISIBLE);
        //typeface = Typeface.createFromAsset(getAssets(), "fonts/fonts3.ttf");

        if (savedInstanceState == null) {
            flyIn();
        }


        new Handler().postDelayed(new Runnable() {

            @Override
            public void run() {
                endSplash();
            }
        }, 3500);
    }//end
//-------------------------------------------------------------------------------------------------
    private void flyIn() {
        animation = AnimationUtils.loadAnimation(this, R.anim.logo_animation);
        logo.startAnimation(animation);

        animation = AnimationUtils.loadAnimation(this, R.anim.app_name_animation);
        title_image.startAnimation(animation);

        animation = AnimationUtils.loadAnimation(this, R.anim.pro_animation);
        title2.startAnimation(animation);
    }//end
//--------------------------------------------------------------------------------------------------
    private void endSplash() {
        animation = AnimationUtils.loadAnimation(this, R.anim.logo_animation_back);
        logo.startAnimation(animation);

        animation = AnimationUtils.loadAnimation(this, R.anim.app_name_animation_back);
        title_image.startAnimation(animation);
        animation.setDuration(4000);

        animation = AnimationUtils.loadAnimation(this, R.anim.pro_animation_back);
        title2.startAnimation(animation);
        animation.setDuration(4000);

        animation = AnimationUtils.loadAnimation(this, R.anim.fade);
        appNameImage.startAnimation(animation);
        appNameImage.setVisibility(View.VISIBLE);
        animation.setDuration(4000);




        animation.setAnimationListener(new AnimationListener() {
            @Override
            public void onAnimationEnd(Animation arg0) {

                Intent intent = new Intent(getApplicationContext(), com.StartUpMenu.class);
                startActivity(intent);
                finish();
            }

            @Override
            public void onAnimationRepeat(Animation arg0) {
            }

            @Override
            public void onAnimationStart(Animation arg0) {
            }
        });

    }//end
//-------------------------------------------------------------------------------------------------
    @Override
    public void onBackPressed() {
        // Do nothing
    }//end
//-------------------------------------------------------------------------------------------------
       /*
     * https://stackoverflow.com/questions/2868047/fullscreen-activity-in-android#:~:text=Using%20Android%20Studio%20(current%20version,click%20on%20%E2%80%9CFullscreen%20Activity%E2%80%9D.
     */
private void askForFullScreen() {
    int currentApiVersion = android.os.Build.VERSION.SDK_INT;
    final int flags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_FULLSCREEN
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;

    //https://stackoverflow.com/questions/21724420/how-to-hide-navigation-bar-permanently-in-android-activity
    if(Build.VERSION.SDK_INT > 11 && Build.VERSION.SDK_INT < 19) { // lower api
        View v = this.getWindow().getDecorView();
        v.setSystemUiVisibility(View.GONE);
    } else if(Build.VERSION.SDK_INT >= 19) {
        //for new api versions.
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(flags);//uiOptions);
    }

}//end

}//end of class
