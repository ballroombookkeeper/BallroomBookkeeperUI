import React from 'react';

interface Entity {
    id: number;
    name: string;
}

interface IProps {
    name: string;
    enabled: boolean;
}

interface IState {
    name: string;
    enabled: boolean;
    text: string;
    showList: boolean;
    list: Entity[]
}

class EntitySearch extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: props.name,
            enabled: props.enabled,
            text: '',
            showList: false,
            list: []
        };
    }

    componentDidMount() {
        this.updateList();
    }

    handleInput(inp: React.FormEvent<HTMLInputElement>) {
        const searchTerm = (inp.target as unknown as {value:string}).value;
        this.setState({showList: true, text: searchTerm});
        this.updateList(searchTerm);
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
                    <input
                        id={ lowerName + "-name-input" }
                        className="input"
                        type="text"
                        placeholder={ placeholder }
                        onInput={(inp) => this.handleInput(inp)}
                        onBlur={() => this.setState({showList: false})}
                        onFocus={() => this.setState({showList: true})}/>
                </div>
                { this.state.list.filter(_ => this.state.showList).map(entity => <a className="button is-fullwidth" href={`/${lowerName}/?id=${entity.id}`}>{entity.name}</a>) }
            </div>;
        return (
            <form method="GET" id={ lowerName + "-search-form" }>
                { this.state.enabled ? field : <fieldset disabled>{field}</fieldset> }
            </form>
        );
    }

    private updateList(search?: string) {
        if (!search) {
            this.setState(() => { return { list: [] }});
            return;
        }

        const apiName = this.state.name.toLowerCase();
        console.log("Searching for " + search);
        fetch(`/api/${apiName}s?search=${search}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                this.setState(() => {
                    return { list: res.map((entity: any) => { return { id: entity[`${apiName}_id`], name: entity[`${apiName}_name`] } })};
                });
            })
            .catch(err => console.log(err));
    }
}

export default EntitySearch;