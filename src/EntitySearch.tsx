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
    selected: number;
    list: Entity[]
}

const KEY = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    ENTER: "Enter"
    // ESC?
}

class EntitySearch extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: props.name,
            enabled: props.enabled,
            text: '',
            showList: false,
            selected: -1,
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
                        onFocus={() => this.setState({showList: true})}
                        onKeyDown={(event) => this.updateSelection(event)}/>
                    <div style={{"zIndex": 5000, "position": "absolute", "width": "100%", "visibility": this.state.showList ? 'visible' : 'hidden'}}>
                        <ul>
                            { this.state.list.map((entity, idx) => {
                                const stylingClasses = `button is-fullwidth ${idx === this.state.selected ? "is-light" : "is-white"}`;
                                return <li>
                                    <a className={stylingClasses} href={`/${lowerName}/?id=${entity.id}`}>
                                        {entity.name}
                                    </a>
                                </li>}) }
                        </ul>
                    </div>
                </div>
            </div>;
        return (
            <form method="GET" id={ lowerName + "-search-form" }>
                { this.state.enabled ? field : <fieldset disabled>{field}</fieldset> }
            </form>
        );
    }

    private updateSelection(event: React.KeyboardEvent) {
        const selectedIdx = this.state.selected;
        switch (event.key) {
            case KEY.UP:
                if (selectedIdx >= 0) {
                    this.setState({selected: selectedIdx - 1});
                }
                break;
            case KEY.DOWN:
                if (selectedIdx < this.state.list.length - 1) {
                    this.setState({selected: selectedIdx + 1});
                }
                break;
            case KEY.ENTER:
                event.preventDefault();
                if (selectedIdx >= 0) {
                    const selected = this.state.list[selectedIdx];
                    const href = `/${this.props.name.toLowerCase()}/?id=${selected.id}`;
                    window.location.href = href;
                }
                break;
            default:
                break;
        }
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