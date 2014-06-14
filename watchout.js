// Basic settings
var settings = {
  width: 640,
  height: 480,
  radius: 10,
  enemyCount: 10
}


//Create actor data
var playerData = [{
  x: settings.width/2,
  y: settings.height/2
}]

var enemyData = [];
for(var i = 0; i <= settings.enemyCount; i++){
  enemyData.push({
    x: Math.random() * settings.width,
    y: Math.random() * settings.height
  });
}


// Create drag behavior
var drag = d3.behavior.drag()
  .on('drag', function(){
    d3.select(this)
      .attr('cx', Math.max(settings.radius, Math.min(settings.width - settings.radius, d3.event.x)))
      .attr('cy', Math.max(settings.radius, Math.min(settings.height - settings.radius, d3.event.y)));
  });


// Create gameBoard
var gameBoard = d3.select('body').append('svg')
  .attr('class', 'gameBoard')
  .attr('width', settings.width)
  .attr('height', settings.height);

gameBoard.append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', settings.width)
  .attr('height', settings.height)
  .style('stroke', 'gray')
  .style('fill', 'none')
  .style('stroke-width', 1);


// Create actors
var player = gameBoard.selectAll('circle').data(playerData)
  .enter().append('circle')
    .attr('class', 'player')
    .attr('fill', 'crimson')
    .attr('cx', function(item){return item.x})
    .attr('cy', function(item){return item.y})
    .attr('r', settings.radius);

player.call(drag);

var enemies = gameBoard.selectAll('circle').data(enemyData)
  .enter().append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(item){return item.x;})
    .attr('cy', function(item){return item.y;})
    .attr('r', 10);

var enemyTurn = function(){
  for(var i = 0; i < enemyData.length; i++){
    enemyData[i].x = Math.random() * (settings.width);
    enemyData[i].y = Math.random() * (settings.height);
  }
}


// Update
setInterval(function(){
  enemyTurn();
  enemies
    .transition()
      .duration(1000)
      .attr('cx', function(item){return item.x;})
      .attr('cy', function(item){return item.y;})
}, 1000)
