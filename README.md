<<<<<<< HEAD
![image](https://github.com/user-attachments/assets/efe3d350-3958-43a2-bd32-53436f5ba57d)
=======
## API DOCUMENTATION

- endpoints

    - GET /getAllComments

   
        
    - GET /getComment

    
        
    - GET /getAllSelectedTexts

   

    - GET /getSelectedText



    - POST /createComment

    
    - POST /createSelectedText



    - DELETE /deleteComment



       
    - DELETE /deleteSelectedText



    - UPDATE /updateComment


    
  
    - UPDATE /updateSelectedText
    

    
  
## API ENDPOINTS TESTING

COMMENTS

- getComment

    {"body": "{\"commentId\": \"1\"}"}

- createComment 

    {
  "body": "{\"commentId\": \"5\", \"content\": \"test\", \"transcriptId\": \"1\", \"userId\": \"1\", \"selectedTextId\": \"1\"}"
}

- updateComment

    {
  "body": "{\"commentId\": \"1\", \"content\": \"test\", \"transcriptId\": \"1\", \"userId\": \"1\", \"selectedTextId\": \"1\"}"
}

- deleteComment

    {
  "body": "{\"commentId\": \"1\"}"
}


SELECTED_TEXTS

- getSelectedText

    {
  "body": "{\"selectedTextId\": \"3\"}"
}

- createSelectedText

    {
  "body": "{\"selectedTextId\": \"3\", \"startIndex\": 2, \"endIndex\": 6, \"transcriptId\": \"1\"}"
}


- updateSelectedText

    {
  "body": "{\"selectedTextId\": \"1\", \"startIndex\": 3, \"endIndex\": 8, \"transcriptId\": \"1\"}"
}

- deleteSelectedText

    {
  "body": "{\"selectedTextId\": \"1\"}"
}




>>>>>>> dev
