/*
1. type in todo > this creates an array of objects with all the matching queries from the APIs: ie:
[
  {name: Apple Book, type: to_read},
  {name: Apple, type: Movie},
  {name: Apple, type: Product}
]
2. user clicks on "type: Product" > a tag? button? how do they "click" on it?

3. When they click on it, the *value* of the targeted todo object would be sent to the database -> THIS IS A POST to the Lists Table (in the db)

4. It would automatically get sent to the user's "product" list in this case

5. an alert, modal, or notification would pop up on success asking the user "Do you want to add another todo? or go to my lists?"

5a. Another TODO: clear the search array (current_search column in the users table aka another query to the database to set this to NUL) and input text area so they can put another todo in

5b. Go to Lists: GET request to /user-lists (redirect) || hide new todo drop down 

-------------------------------------
LIST OF LISTS: (/user-lists)

|-----|----------------|-------------|
 NAME | short descrip. | EDIT, DELETE

 edit would take you to a new GET request to /todo/:id

*/
