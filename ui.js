(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  Hanoi.UI = function() {
    this.game = new Hanoi.Game();
    this.startTower = null;
    this.endTower = null;
    var that = this;

    $('.tower').on('click', function(event) {
      var target = event.currentTarget;
      var tower = parseInt(target.className.split("-").splice(1,1));
      if (that.startTower === null) {
        that.startTower = tower;
        $(this).css({'background-color':'orange'});
      } else {
        if (that.game.isValidMove(that.startTower, tower)) {
          that.game.move(that.startTower, tower);
        }
        that.startTower = null;
        $('.tower').css({'background-color': 'transparent'});
      }
      if (that.game.isWon()) {
        $('#info').text("You won!");
      }

      that.renderTowers();
    });
  };

  Hanoi.UI.prototype.renderTowers = function() {
    var that = this;
    $('.tower').each( function(){ $(this).empty(); });
    this.game.towers.forEach(function(el, idx){
      that.drawTower(el, idx);
    });
  };

  Hanoi.UI.prototype.drawTower = function(tower, idx) {
    towerEl = $('.tower-' + (idx));
    len = tower.length-1
    tower.forEach(function(disc, idx) {
      var discEl = $('<div></div>');
      discEl.addClass('disc disc-' + (disc));
      discEl.css({
        'position': 'absolute',
        'bottom': 40*(idx)
      });
      $(towerEl).append(discEl);
    });
  };

})(this);