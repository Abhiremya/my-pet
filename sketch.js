var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  var dogo = database.ref('Food');
  dogo.on("value", readStock, showError);
  feed = createButton("FEED")
  feed.position(700,95)
  feed.mousePressed(feedDog)


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  if(lastFed>=12){
  } else if(lastFed==0){
    text ("Last Feed : 12 AM",350,30)
  }

    
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function showError(){
  console.log("Error in writing to the database");
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

var foodstockval = foodObj.getFoodStock();
if(foodstockval<=0){
  foodObj.updateFoodStock(foodstockval*0);
}else{
  foodObj.updateFoodStock(foodstockval-1);
}

  // foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  // database.ref('/').update({
  //   Food:foodobject.getFoodStock(),
  //   FeedTime:hour ()
 // })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
