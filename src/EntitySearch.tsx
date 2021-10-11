import React from 'react';

interface IProps {
    name: string;
    enabled: boolean;
}

interface IState {
    name: string;
    enabled: boolean;
    list: string[]
}

class EntitySearch extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: props.name,
            enabled: props.enabled,
            list: []
        };
    }

    handleInput(inp: React.FormEvent<HTMLInputElement>) {
        const searchTerm = (inp.target as unknown as {value:string}).value;
        console.log("Searching for " + searchTerm);
        fetch('/api/competitors?search=' + searchTerm) // TODO: use appropriate api per entity
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                this.setState(() => {
                    return { list: res.map((comp: any) => comp.competitor_name)};
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const placeholder = this.state.name + " Name";
        const lowerName = this.state.name.toLowerCase();
        const field =
            <div className="field">
                <label className="label">
                    { this.state.name } Search
                </label>
                <div className="control">
                    <input id={ lowerName + "-name-input" } className="input" type="text" placeholder={ placeholder } onInput={(inp) => this.handleInput(inp)} />
                </div>
                { this.state.list.map(name => <p>{name}</p>) /* TODO: Make these links */}
            </div>;
        return (
            <form method="GET" id={ lowerName + "-search-form" }>
                { this.state.enabled ? field : <fieldset disabled>{field}</fieldset> }
            </form>
        );
    }
}

export default EntitySearch;