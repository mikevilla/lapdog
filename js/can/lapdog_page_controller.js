var lapdogPageControl  = can.Control(
{
  defaults:{
    test_structure:null
  }
},
// @Prototype
{
  init:function () {
    this.load();
              var self = this;
              console.log('lapdog control')

  },

  load:function (test_data) {
    if (!this.hasOwnProperty('set_up_complete')) {
      this.set_up_complete = false;
    }
    if (!this.set_up_complete) {
      this.set_up_complete = true;
      console.log(test_data);
      $('#senator_container_layout').html(can.view('js/can/templates/senator_scorecard_template', {test_data:test_data}));
      $('#house_container_layout').html(can.view('js/can/templates/house_scorecard_template', {test_data:test_data}));

    }
  }


});