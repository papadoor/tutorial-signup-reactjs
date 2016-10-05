import React from 'react';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';

export default class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    isValid() {
       const { errors, isValid } = validateInput(this.state);

       if (!isValid) {
            this.setState({ errors });
       }
       return isValid;
    }
    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up successfully. Welcome!!'
                    });
                    this.context.router.push('/');
                },
                ( data ) => this.setState({ errors: data.response.data, isLoading: false })
            );
        }

    }
    render() {
        const { errors } = this.state;
        return (
            <div className="panel panel-default">
              <div className="panel-heading">Form Register</div>
              <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    value={this.state.username}
                    field="username"
                    />
                    <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                    type="password"
                    />
                  <button disabled={this.state.isLoading} type="submit" className="btn btn-default">Submit</button>
                </form>
              </div>
            </div>
        );
    }
}
SignupForm.propTypes = {
        userSignupRequest: React.PropTypes.func.isRequired,
        addFlashMessage: React.PropTypes.func.isRequired
    }
SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}
