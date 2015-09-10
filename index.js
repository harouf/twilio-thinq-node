var RestClient = require('twilio');

var TWIML_RESOURCE_URL = "http://cris.viralearnings.com/twiml/get_response";

var TwilioWrapper = function(customer_number, twilio_account_sid, twilio_account_token, twilio_phone_number){
	this.customer_number = customer_number;
	this.twilio_account_sid = twilio_account_sid;
	this.twilio_account_token = twilio_account_token;
	this.twilio_phone_number = twilio_phone_number;

	this.client = RestClient(twilio_account_sid, twilio_account_token);
};

TwilioWrapper.prototype.isClientValid = function(){
	return this.client != null && Object.keys(this.client).length > 0;
};

TwilioWrapper.prototype.call = function(){
	if(!this.isClientValid()) {
        console.log("Invalid Twilio Account details.");
        return;
    }

    this.client.calls.create({
	    url: TWIML_RESOURCE_URL,
	    to: this.customer_number,
	    from: this.twilio_phone_number
	}, function(err, call) {
		if(call && call.sid)
		{
			console.log("Successfully initiated a new call to customer!");
	    	console.log("Call sid: " + call.sid);
		}else{
			console.log(err);
		}
	});
};

module.exports = TwilioWrapper;