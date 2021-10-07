import React from 'react';

interface IProps {
    name: string;
    enabled: boolean;
}

interface IState {
    name: string;
    enabled: boolean;
}

class EntitySearch extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = props;
    }

    render() {
        const placeholder = this.state.name + " Name";
        const field =
            <div className="field">
                <label className="label">
                    { this.state.name } Search
                </label>
                <div className="control">
                    <input id="competitor-name-input" className="input" type="text" placeholder={ placeholder } />
                </div>
            </div>;
        return (
            <form method="GET" id="competitor-search-form">
                { this.state.enabled ? field : <fieldset disabled>{field}</fieldset> }
            </form>
        );
    }
}

export default EntitySearch;