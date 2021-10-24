import React from 'react';
import { Link } from 'react-router-dom';

import './EntitySearch.css';

interface Entity {
    id: number;
    name: string;
}

interface IProps {
    name: string;
    enabled: boolean;
}

interface IState {
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

    private wrapperRef: React.RefObject<HTMLDivElement>;

    constructor(props: IProps) {
        super(props);
        this.state = {
            text: '',
            showList: false,
            selected: -1,
            list: []
        };
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
        this.updateList();
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    render() {
        const placeholder = this.props.name + " Name";
        const lowerName = this.props.name.toLowerCase();
        const field =
            <div className="field" ref={this.wrapperRef}>
                <label className="label">
                    { this.props.name } Search
                </label>
                <div className="control" tabIndex={0}
                    onFocus={() => this.setState({showList: true})}>
                    <input
                        id={ lowerName + "-name-input" }
                        className="input"
                        type="text"
                        placeholder={ placeholder }
                        onInput={(inp) => this.handleInput(inp)}
                        onKeyDown={(event) => this.updateSelection(event)}/>
                    <div style={{"zIndex": 5000, "position": "absolute", "width": "100%", "visibility": this.state.showList ? 'visible' : 'hidden'}}>
                        <ul>
                            { this.state.list.map((entity, idx) => {
                                const stylingClasses = `button button-dropdown is-fullwidth ${idx === this.state.selected ? "is-selected" : "is-unselected"}`;
                                return <li>
                                    <Link className={stylingClasses} to={`/${lowerName}/${entity.id}`}>{entity.name}</Link>
                                </li>}) }
                        </ul>
                    </div>
                </div>
            </div>;
        return (
            <form method="GET" id={ lowerName + "-search-form" }>
                { this.props.enabled ? field : <fieldset disabled>{field}</fieldset> }
            </form>
        );
    }

    private handleInput(inp: React.FormEvent<HTMLInputElement>) {
        const searchTerm = (inp.target as unknown as {value:string}).value;
        this.setState({showList: true, text: searchTerm});
        this.updateList(searchTerm);
    }

    private handleClickOutside(event: MouseEvent): void {
        if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event?.target as Node)) {
            this.setState({showList: false})
        }
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
                    const href = `/${this.props.name.toLowerCase()}/${selected.id}`;
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

        const apiName = this.props.name.toLowerCase();
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