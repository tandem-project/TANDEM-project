package com;

/**
 * Created by user on 24/9/2019.
 */

public class BufferDescriptorsTable {

    public int MAX_NUMBER_OF_BD = 100;// was 10;
    public BufferDescriptor[] bufferBdCycle = new BufferDescriptor[MAX_NUMBER_OF_BD];
    public int nextBufferDescriptorToFill = 0;
    public int nextBufferDescriptorToRead = 0;

   public BufferDescriptorsTable(){
        /*
         * Create BufferDescriptor
         * cyclic buffer list
         */

       for(int i = 0; i < MAX_NUMBER_OF_BD; i++){
           BufferDescriptor bufferDescriptor = new BufferDescriptor(i,false);
           bufferBdCycle[i] = bufferDescriptor;
           bufferBdCycle[i].empty = true;
       }

       bufferBdCycle[MAX_NUMBER_OF_BD -1].last = true;

    }//end
//----------------------------------------------------------
 public void reset(){
     nextBufferDescriptorToFill = 0;
     nextBufferDescriptorToRead = 0;

     for(int i = 0; i < MAX_NUMBER_OF_BD; i++){
         BufferDescriptor bufferDescriptor = new BufferDescriptor(i,false);
         bufferBdCycle[i] = bufferDescriptor;
         bufferBdCycle[i].empty = true;
     }

     bufferBdCycle[MAX_NUMBER_OF_BD -1].last = true;
 }//end
//----------------------------------------------------------
    public BufferDescriptor getNextEmptyBufferDescriptorToFill(){
      // check it
        int bufferIndex = nextBufferDescriptorToFill;

        /*
         * Check if is empty.
         */

        if(bufferBdCycle[bufferIndex].empty == false)
            return null;

        /*
         * Advance nextBufferDescriptorToFill
         * check with last bit or index???
         */

        if(nextBufferDescriptorToFill == MAX_NUMBER_OF_BD -1)
            nextBufferDescriptorToFill = 0;
        else
            nextBufferDescriptorToFill++;

        return(bufferBdCycle[bufferIndex ]);
    }//end
       //----------------------------------------------------------
    /*
     * Return only buffer descriptor
     * with content.When the content is read
     * then the empty bit must be false.
     */
    public BufferDescriptor getNextFullBufferDescriptorToRead(){
        // check it
        int bufferIndex = nextBufferDescriptorToRead;

        if(bufferBdCycle[bufferIndex].empty == true)
            return null;

        /*
         * Advance nextBufferDescriptorToRead
         */

     /*   if(nextBufferDescriptorToRead == MAX_NUMBER_OF_BD -1)
            nextBufferDescriptorToRead = 0;
        else
            nextBufferDescriptorToRead++;
    */
        return(bufferBdCycle[bufferIndex]);
    }//end
//----------------------------------------------------------------------------------------------
    public void updateNextBufferToRead(){
        /*
         * Advance nextBufferDescriptorToRead
         */

        if(nextBufferDescriptorToRead == MAX_NUMBER_OF_BD -1)
            nextBufferDescriptorToRead = 0;
        else
            nextBufferDescriptorToRead++;



    }//end

}//end of class
