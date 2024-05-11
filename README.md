# Cat Expense Tracker

Do `yarn` to install all dependencies.

`yarn dev` to run the application

## Cat Expense Web Requirement

Your task is to implement a cat expense web front end with the following functionalities:
Main UI:
-	The Main UI should have the same components as Image 1 below, although you can style the UI anyway you look. (Show your creativity!)
Add Expense:
-	When pressing the “Add Expense” button, the “Expense Detail” dialog should pop up. (see image 2) – again feel free to style it.
-	In the Expense Detail dialog, the user needs to input Item name, Category, and the amount. (All mandatory) 
-	Feel free to add any additional validations that you think is appropriate
-	There are three categories: Food, Furniture, Accessory.
-	Everytime we pop-up the “Expense Detail dialog”, the dialog should show a random cat fact obtained from calling the API: https://catfact.ninja/ 
-	In the Expense Detail dialog, when the user clicks submit, the dialog should close and the new item should show up in the Main UI

Delete Expenses:
-	The user can select one or more items to delete by using the check box , and “Delete Expense” button.

Top CATegory:
-	All the rows with the highest spending category should be highlighted
-	If you spent the same on two categories, please highlight both categories.

