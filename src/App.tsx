import React from "react";
import "./styles.css";

interface IRowProps {
  data: IDataRecord;
  onUpdate: (index: number) => void;
}

class Row extends React.Component<IRowProps> {
  renderCount = 0;

  shouldComponentUpdate(nextProps: IRowProps) {
    if (nextProps.data.value === this.props.data.value) return false;

    return true;
  }

  render() {
    const {
      data: { label, value, id },
      onUpdate,
    } = this.props;

    this.renderCount++;

    return (
      <div>
        <span className="label">{label}:</span>
        <span>{value}</span> <span>({this.renderCount})</span>{" "}
        <button className="button" onClick={() => onUpdate(id)}>
          Update
        </button>
      </div>
    );
  }
}

interface IDataRecord {
  id: number;
  label: string;
  value: number;
}

interface IAppProps {
  size?: number;
}

export default class App extends React.Component<
  IAppProps,
  { list: IDataRecord[] }
> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      list: Array.from({ length: this.props.size ?? 200 }, (_el, index) => ({
        id: index,
        label: `label ${index + 1}`,
        value: App.generateValue(),
      })),
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate = (idx: number) => {
    this.setState((prevState) => ({
      ...prevState,
      list: prevState.list.map((item) => ({
        ...item,
        value: item.id === idx ? App.generateValue() : item.value,
      })),
    }));
  };

  static generateValue() {
    return Math.round(100 + Math.random() * 900);
  }

  render() {
    return (
      <div>
        <h1>Test app</h1>
        {this.state.list.map((row) => (
          <Row
            data={row}
            key={row.id}
            onUpdate={this.handleUpdate.bind(this)}
          />
        ))}
      </div>
    );
  }
}
