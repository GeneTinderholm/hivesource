# Hive-Source

This started as a one day hackathon project that I've since fleshed out a bit more. It is still under development.

Summary: Hive-source is an app for time management. Logging in, you will be able to view a list of projects. Each project has tasks. Click the top right (nav bar) to add project. When on a project page, you can view all tasks. If a user adds a task it will automatically be updated on your page. If a user volunteers for a task, that user will also appear on the task table.

1. Clone this repo. Run the following command from the terminal:

    git clone https://github.com/GeneTinderholm/hivesource

2. To install the module dependencies, run the following command from within the main project folder:

    npm i

3. Install mongodb.

4. Start the project. The following command should start it listening on port 3000 when run from the main project folder.

    node app.js 

5. Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

6. If you are not logged in, you will be redirected to a login page. Input the username and password and click the "Log In" button.

Note: If you do not yet have an account click the "or sign up" button at the bottom of the panel. Input the desired username and password and click the "Sign Up" button. Then log in as normal.

7. You should be greeted with the following page:

![Main](https://github.com/GeneTinderholm/hivesource/blob/master/images/main.png?raw=true)

On top is a greeting. Below that is a list of projects you have volunteered for. Below that is a link to the list of all projects.

Click the link to see the list of all projects and you should end up on a page that looks like: 

![All Projects](https://github.com/GeneTinderholm/hivesource/blob/master/images/allProjects.png?raw=true)

If there are no projects, clicking the menu in the top right and clicking the "New Project" link will bring you to a page to create a new one.

The link for viewing an individual project should look something like:

![Single Project](https://github.com/GeneTinderholm/hivesource/blob/master/images/singleProject.png?raw=true)

On top is the name and description of the project. Below this is a countdown that tells you how far away the project deadline is.

Below this is a table with all of the projects tasks, the deadlines of each of those tasks, and the names of those who are volunteering for each task.

Clicking the green "Click to Volunteer" button should add your name to the list of volunteers.

Clicking the blue "Add a Task" button should reveal a panel where you can add a new task. It should look something like this:

![Add Task](https://github.com/GeneTinderholm/hivesource/blob/master/images/addTask.png?raw=true)

Completing this form should add a new task to the table on the project.

Clicking any task name will bring you to the display page for the task. On top is the name and description of the task and below that is a separate countdown for this task.

Below that is a table of users who have volunteered for the task.

The page should look something like: 

![Task](https://github.com/GeneTinderholm/hivesource/blob/master/images/task.png?raw=true)

Clicking a username will bring you to the profile page for the user. It should look something like: 

![User Profile](https://github.com/GeneTinderholm/hivesource/blob/master/images/user.png?raw=true)

The top panel contains the user's username, the date on which they became a member and a profile picture. 

Below this is a list of projects they have volunteered for. Below that is a similar list of tasks.
