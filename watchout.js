var settings = {
  width: 640,
  height: 480,
  enemyCount: 10
}

var enemyData = [];

for(var i = 0; i < settings.enemyCount; i++){
  enemyData.push({
    x: Math.random() * settings.width,
    y: Math.random() * settings.height
  });
}

var gameBoard = d3.select('body').append('svg')
  .attr('class', 'gameBoard')
  .attr('width', settings.width)
  .attr('height', settings.height);

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

setInterval(function(){
  enemyTurn();
  enemies
    .transition()
      .duration(1000)
      .attr('cx', function(item){return item.x;})
      .attr('cy', function(item){return item.y;})
}, 1000)
