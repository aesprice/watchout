// Basic settings
var settings = {
  width: 640,
  height: 480,
  radius: 10,
  enemyCount: 30
}


// Create data
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

var scoreData = {
  high: 0,
  score: 0,
  lost: 0
};


// Create behavior
var drag = d3.behavior.drag()
  .on('drag', function(){
    d3.select(this)
      .attr('cx', Math.max(settings.radius, Math.min(settings.width - settings.radius, d3.event.x)))
      .attr('cy', Math.max(settings.radius, Math.min(settings.height - settings.radius, d3.event.y)));
  });

var checkForCollision = function(){
  enemies.each(function(){
    enemy = d3.select(this);
    player = d3.select('.player');
    var distance = Math.sqrt(Math.pow(enemy.attr('cx') - player.attr('cx'), 2) + Math.pow(enemy.attr('cy') - player.attr('cy'), 2));
    if(distance < (settings.radius * 2)){
      if(scoreData.high < scoreData.score){
        scoreData.high = scoreData.score
        d3.select('.high').text('HIGH SCORE: ' + scoreData.high)
      }
      scoreData.score = 0;
      scoreData.lost++;
    }
  });
};


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
      .attr('cy', function(item){return item.y;});
}, 1000);

setInterval(function(){
  checkForCollision();
  scoreData.score += 1;
  d3.select('.current').text('SCORE: ' + scoreData.score);
  d3.select('.collisions').text('FAILURES: ' + scoreData.lost);
}, 100);
