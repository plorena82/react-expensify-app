//// DEPRECATED WE ARE USING WEBPACK; SCRIPTS FOLDER AND APP.JS no longer NEEDED
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteAllOptions = _this.handleDeleteAllOptions.bind(_this);
        _this.handleMakeDecision = _this.handleMakeDecision.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            options: [] //props.defOptions
        };

        return _this;
    }

    ////LIFECYCLE METHODS
    //initializes the stae and props of Class components


    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                //   console.log('Did Mount!, fetching data');
                var json = localStorage.getItem('options'); //brings the data which is in localStorage
                var options = JSON.parse(json);
                if (options) {
                    //to ensure we are not setting the options array null in our state
                    this.setState(function () {
                        return { options: options };
                    }); //set the options with the value in localstorage
                }
            } catch (e) {//to catch invalid values of JSON when parsing
                //do nothing, but avoids braking the app

            }
        }

        //changes in props and state

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                //console.log('Component update');
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }

        //when we switch to another page, to unmount the component

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}

        ////////////////////////////////////

    }, {
        key: 'handleMakeDecision',
        value: function handleMakeDecision() {
            var random = Math.floor(Math.random() * this.state.options.length);
            var opt = this.state.options[random];
            alert(opt);
        }

        //function will be called from the child components return short way, notice the ( )after the arrow, 
        //it indicates we are returning an object

    }, {
        key: 'handleDeleteAllOptions',
        value: function handleDeleteAllOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option; //indicating we want to remove this option from the array
                        //filter will iterate over optiosn and put in options all the elements of the options array (option != optionToRemove)
                        //and remove/filter the one which does not meet the condition (optionToREmove == option)
                    })
                };
            });

            //        console.log('Handle delete option:', optionToRemove);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                return 'Enter valid value';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'This option already exists';
            }
            this.setState(function (prevState) {
                return { options: prevState.options.concat(option) };
            }); //short way

            console.log('added');
        }
    }, {
        key: 'render',
        value: function render() {
            // const title = 'Indecision'; This added in default props
            //title={title} removed from the Header tag 
            var subtitle = 'Put your hands on coding';

            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handleMakeDecision: this.handleMakeDecision
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteAllOptions: this.handleDeleteAllOptions,
                    handleDeleteOption: this.handleDeleteOption }),
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

var Header = function Header(props) {

    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

//DEFAULT PROPS 
//Header.defaultProps ={
//  title: 'Indecision'
//};

//Stateless functional component
var Action = function Action(props) {

    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handleMakeDecision,
                disabled: !props.hasOptions },
            'What should I do?'
        )
    );
};

//Stateless functional component
var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteAllOptions },
            ' Remove All'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Please add options to get started!'
        ),
        React.createElement(
            'ol',
            null,
            props.options.map(function (option) {
                return React.createElement(Option, {
                    key: option,
                    option: option,
                    handleDeleteOption: props.handleDeleteOption
                });
            })
        )
    );
};

//Stateless functional component
var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'li',
            { key: props.option },
            props.option,
            React.createElement(
                'button',
                { onClick: function onClick(e) {
                        //here we created a function passing the event and then calling the handledeleteOption
                        //as if we call directly the handleDeleteOption we would be passing the event and not the props.option as param (the behavior is that).
                        props.handleDeleteOption(props.option);
                    }
                },
                'Remove'
            )
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();
            var option = e.target.elements.optionF.value.trim();
            var error = this.props.handleAddOption(option);
            //error: error is the same
            this.setState(function () {
                return { error: error };
            });
            if (!error) {
                e.target.elements.optionF.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'optionF' }),
                    React.createElement(
                        'button',
                        null,
                        ' Add option'
                    ),
                    this.state.error && React.createElement(
                        'p',
                        null,
                        ' ',
                        this.state.error
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

/*
const jsx = (

    <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
    </div>);
*/

// DEFAULT PROPS in this case we configure as default an array of options, it is empty but we can set the 
//values in the IndecisionApp as attribute defOptions.
//Notice that defOption={} uses {} for a javascript expression in this case the array of default values we want to set


IndecisionApp.defaultProps = {
    defOptions: []
};
//ReactDOM.render(<IndecisionApp defOptions={['One option','Two options','Three options']}/>, document.getElementById('app'));

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));

//STATELESS FUNCTIONAL COMPONENT EXAMPLE
/*const User = (props) =>{
    return(
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );

}
ReactDOM.render(<User name="Paula" age={5} />, document.getElementById('app'));
*/
