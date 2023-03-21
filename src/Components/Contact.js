import React, { Component } from 'react';
import $ from "jquery";
import axios from "axios";

class Contact extends Component {
  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
    };

    function getError(err) {
      if(typeof err === "string") return err;
      if(typeof err.response.data === "string") return err.response.data; // axios: 401, 403, 500
      if(Array.isArray(err.response.data)) return err.response.data[0]; // axios: 400 - array of errors
      if(typeof err.message === "string") return err.message;
      return "Some error, please try again.";
    }

    async function submit(e){
      e.preventDefault();
      $('#image-loader').fadeIn();
      const contactDetails = {
        contactName: $('#contactName').val(),
        contactEmail: $('#contactEmail').val(),
        contactSubject: $('#contactSubject').val(),
        contactMessage: $('#contactMessage').val()
      }

      try {
        const response = await axios.post('https://my-resume-server.onrender.com/api/send', contactDetails);
        // const response = await axios.post('http://127.0.0.1:5003/api/send', contactDetails);
        const status = response.data;
        if(status){
          $('#image-loader').fadeOut();
          $('#message-warning').hide();
          $('#contactForm').fadeOut();
          $('#message-success').fadeIn();
        }
      } catch (error) {
        const err = getError(error);
        $('#message-success').hide();
        $('#image-loader').fadeOut();
        $('#message-warning').html(err);
        $('#message-warning').fadeIn();
      }
    };

    return (
      <section id="contact">
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="eight columns">
            <form onSubmit={submit} name="contactForm">
              <fieldset>
                <div>
                  <label htmlFor="contactName">Name <span className="required">*</span></label>
                  <input required type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.handleChange} />
                </div>
                <div>
                  <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                  <input required type="email" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange} />
                </div>
                <div>
                  <label htmlFor="contactSubject">Subject</label>
                  <input required type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange} />
                </div>
                <div>
                  <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                  <textarea cols="50" rows="15" id="contactMessage" name="contactMessage"></textarea>
                </div>
                <div>
                  <button className="submit">Submit</button>
                  <span id="image-loader">
                    <img alt="" src="images/loader.gif" />
                  </span>
                </div>
              </fieldset>
            </form>

            <div id="message-warning"> Error boy</div>
            <div id="message-success">
              <i className="fa fa-check"></i>Your message was sent, thank you!<br />
            </div>
          </div>

          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h2 style={{ color: "white" }}>Contact Details</h2>
              <p className="address">
                {name}<br />
                <span>{phone}</span><br />
                <span>{email}</span>
              </p>
            </div>
          </aside>
        </div>
      </section>
    );
  }
}

export default Contact;
