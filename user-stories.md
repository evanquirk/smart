As a busy, disorganized person, I want an app to automatically sort my To-Do notes into relevant categories because I do not want to lose them or become overwhelmed by their quantity and vagueness. The relevant categories for me are "to watch," "to read," "to eat," and "to buy" -- everything else can be categorized as "other." For example, I want all the movies/shows that I note down to be automatically contained in a single place: my "to watch" list.

As a user, I want to add a To-Do because I want to engage with it later. I want the To-Dos that I add to be matched with the actual movies/shows, books, restaurants/cafés, products etc. that they correspond to, and to be automatically added to the correct list along with some contextual information. I also want to be able to change or delete this information because it might be incorrect or I might have more thoughts to add. If a To-Do is placed in the wrong list, I want to be able to move it to the correct one. 

As a user, I want to be able to view To-Dos in a list beginning with the most recently added for ease of reference. (Stretch: I want to be able to sort To-Dos within a list in any order.)

As a person who would like to use the "Smart To-Do List App" to make and save lists, I want to register a profile. I want my own account so that my To-Do lists do not get mixed up with anybody else's, and so that I can set them as public or private.

As a logged-in user, I want to be able to view all the lists that I have created. I also want to be able to see at a glance which ones are private and which ones are public.

As a logged-in user, I want to be able to remove my completed To-Dos.

As a logged-in user, I want to be able to log out.

As a user with or without an account, I want to be able to share my list with anyone to get their input. I want them to be able to add to my notes on any given To-Do.

As a user, I want a good mobile experience because I may not have my desktop with me.



Stretch:

As a logged-in user, I want to be able to search my lists.

As a logged-in user, I want to be able to update my profile so that I am not stuck with the details I first entered forever.

As a prospective user, I want the ability to make lists before being prompted to register an account in order to save my lists.

If my To-Do is a part of multiple categories (e.g. it's a movie and a book) I want to be able to choose which category it goes into.

--

Routes:

GET / -- presents a register / sign-in form, followed by an example (.gif?) of the app's functionality

GET / register -- if a user clicks Register on the GET / page, presents an expanded form for registering

GET / user_id -- if log-in credentials are correct, presents an input form for To-Dos, followed by links to the user's existing list_ids. If it's another user trying to access this, they are redirected back to their own page.

GET / list_id -- looks at a specific list

GET / to_do_id -- looks at a particular To-Do, allowing users to edit the description from its API source (if that was found), the user notes, and the category it is in

PUT / to_do_id -- post request to update a particular To-Do with any changes

POST / register -- submit the form we have filled out, saving our user

POST / login

POST / logout -- clears cookies

DELETE / list_id

DELETE / to_do_id

POST / preview -- when a user submits a To-Do, the page refreshes with a box showing their submitted To-Do with a colour-coded or otherwise indicated matched category. This preview box should be editable and it should have Submit and Clear buttons. If a user deletes the To-Do in the preview box it should go away too.

POST / list_id -- To-Do is added to the correct list when a user hits Submit.


******
Git branch workflow
While in project folder on master branch:


```
git pull (this is pulling from origin master)
git checkout -b feat/signup

```
While on the signup branch, do all the git adds and commits when you are ready

```
git push origin HEAD
```
When your branch is ready to go:
Head to git repo on browser. 
Make a pull request.
Squash and merge.

always head back to master(or main)
```
git checkout main
git pull

_NEVER PUSH TO MAIN REMOTELY. ALWAYS MERGE IN REPO_


