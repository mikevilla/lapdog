var lapdogPageControl  = can.Control(
{
  defaults:{
    defaultState: "Georgia"
  }
},
// @Prototype
{
  init:function () {
    this.load(test_data);
    var self = this,
      state = self.getUrlParameter("state");

    // get the state from the url and of one is not present then setup a default
    if (state) {
      state = state.replace(/%20/g, " ");
      console.log("init state", state);
      $.lapdog.initial_state = state;
    } else {
      $.lapdog.initial_state = lapdogPageControl.defaults.defaultState;
    }

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


        // setup variables for state records and state names
        var state_data = $.state_data.states[lapdogPageControl.defaults.defaultState],
            state = lapdogPageControl.defaults.defaultState,
            list_senators = [],
            list_reps = [];

        // if a state was given in the url make sure that it is valid otherwise revert to default

        if (typeof $.state_data.states[$.lapdog.initial_state] != 'undefined') {
          state_data = $.state_data.states[$.lapdog.initial_state];
          state = $.lapdog.initial_state;
        }

        $.each(state_data, function( index, value ) {

          // find the desired state and determine with its senator or house rep
          if (state_data[index].state == state) {
            if (state_data[index].type == "") {
              list_senators.push(value);

              if (list_senators.length == 1) {
                list_senators[0].senior = "1";
              } else {
                if (list_senators[0].years >= list_senators[1].years) {
                  list_senators[0].senior = "1";
                  list_senators[1].senior = "0";
                } else {
                  list_senators[0].senior = "0";
                  list_senators[1].senior = "1";
                }
              }

            } else {
              list_reps.push(value);
            }
          }

        });

        // sort the reps by contribution
        list_reps.sort(function(a,b) {return (a.total_contributions < b.total_contributions) ? 1 : ((b.total_contributions < a.total_contributions) ? -1 : 0);} );

        // display the the senator and house of reps data
        $('#senator_container_layout').html(can.view('js/can/templates/senator_scorecard_template', {display_senators: list_senators, state: state}));
        $('#house_container_layout').html(can.view('js/can/templates/house_scorecard_template',{display_reps: list_reps, state: state}));

      }, null);



      $( "#sign-petition" ).click(function( event ) {

        // Stop form from submitting normally
        event.preventDefault();
        console.log("sign-petition");

        // extract values from the form
        var $form = $("#signup"),
        email = $form.find("#email").val(),
        firstname = $form.find("#firstname").val(),
        lastname = $form.find("#lastname").val(),
        zip = $form.find("#zip").val(),
        isEmailValid = false,
        formParamsValid = false,
        formData = {
          email: "",
          firstname: "",
          lastname: "",
          zip: ""
        };



        console.log("email", email);
        console.log("firstname", firstname);
        console.log("lastname", lastname);
        console.log("zip", zip);

        // check the required fields of the form
        formParamsValid = outer.checkform($form);
        console.log("formParamsValid:", formParamsValid);

        if (formParamsValid) {
          console.log("Proceed to submit");
          formData.email = email;
          formData.firstname = firstname;
          formData.lastname = lastname;
          formData.zip = zip;

          console.log(formData);

          outer.signPetition (formData, function() {
            console.log("success FROM POST");
            $("#completed-petition").fadeIn();

          }, function() {
            console.log("error IN POST");
            $("#error-petition").fadeIn();

          });



        } else {
          console.log("Errors in email form");
        }

      });

      this.set_up_complete = true;
    }
  },

  createNestedObject : function( base, names ) {
    for (var i = 0; i < names.length; i++) {
      base = base[ names[i] ] = base[ names[i] ] || {};
    }

  },

  isValidEmailAddress : function(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
  },

  checkform :function (form) {

      var outer = this,
          email = form.find("#email").val(),
          formParamsValid = true;

      // clear the error messages
      $(".error-msg").css('visibility', 'hidden');


      var inputs = $('input');
      for (var i = 0; i < inputs.length; i++) {
          // only validate the inputs that have the required attribute
          if(inputs[i].hasAttribute("required")){
              if(inputs[i].value == ""){
                  // found an empty field that is required
                  $(inputs[i]).next().css('visibility', 'visible');
                  formParamsValid = false;
              }
          }
      }


      if ( !outer.isValidEmailAddress( email ) ) {

         isEmailValid = false;
         formParamsValid = false;

         // display the error message
         $(".email-error").css('visibility', 'visible');
         console.log("email is invalid")
      } else {
         isEmailValid = true;
         console.log("VALID EMAIL")
      }



      // return the value on whether or not the form had valid params
      return formParamsValid;
  },

  signPetition : function  (formData, success_func, error_func) {

    $.ajax({
        url:"http://actions.bradycampaign.org/page/s/finish-the-job-petition",
        data: formData,
        type:"POST",
        success:success_func,
        error:error_func
    });
  },

  getUrlParameter : function (sParam)
  {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
  }

});