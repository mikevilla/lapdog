var lapdogPageControl  = can.Control(
{
  defaults:{

  }
},
// @Prototype
{
  init:function () {
    this.load(test_data);
    var self = this;
    console.log('lapdog control')

  },

  load:function (test_data) {
    if (!this.hasOwnProperty('set_up_complete')) {
      this.set_up_complete = false;
    }
    if (!this.set_up_complete) {

      var outer = this;


      // make the json call here and dont show the map until completely processed
      $.lapdog.state_data(function (data) {

        $.lapdog_data = data;
        $.state_data = {
          states: {},
          total: 0
        };


        var list_senators = [],
            list_reps = [];

        // build the hash of states
        $.each($.lapdog_data, function( index, value ) {

          outer.createNestedObject( $.state_data.states, [value.state] );
          $.state_data.states[value.state] = [];
          $.state_data.total = $.state_data.total + 1;

        });

        // populate the hash with the records
        $.each($.lapdog_data, function( index, value ) {
          $.state_data.states[value.state].push(value);
        });

      }, null);




      /// original display each template here:
      this.set_up_complete = true;
      $('#senator_container_layout').html(can.view('js/can/templates/senator_scorecard_template', {test_data:test_data}));
      $('#house_container_layout').html(can.view('js/can/templates/house_scorecard_template', {test_data:test_data}));

    }
  },

  createNestedObject: function( base, names ) {
    for (var i = 0; i < names.length; i++) {
      base = base[ names[i] ] = base[ names[i] ] || {};
    }

  }




});