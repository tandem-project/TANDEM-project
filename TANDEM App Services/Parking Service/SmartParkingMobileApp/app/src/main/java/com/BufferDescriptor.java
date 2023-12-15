package com;

import android.graphics.Bitmap;

/**
 * Created by user on 24/9/2019.
 */

public class BufferDescriptor {

    public String parkingInfo = null;
    public Bitmap bitmap = null;
    public String frameURL = null;
    public boolean empty = true;
    public int index;
    public boolean last = false;
//-------------------------------------------------------------------------------------------------------------------------
    public BufferDescriptor(int index, boolean last ){
        empty      = true;
        this.last  = last;
        this.index = index;
        parkingInfo = "-";
        frameURL    = "-";
        bitmap = null;
    }//end
//--------------------------------------------------------------------------------------------------------------------------
    public void fill(String parkingInfo, String frameURL,Bitmap bitmap){
        this.parkingInfo = parkingInfo;
        this.frameURL    = frameURL;
        this.bitmap      = bitmap;
        empty   = false;
    }//end
//----------------------------------------------------------------------------------------------------------------------------

}//end of class
