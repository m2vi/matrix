import React from 'react';
import { chars } from './data';

export default class Matrix extends React.Component<any, any> {
  constructor(props: any) {
    super(props as any);

    this.state = {
      canvas: null,
    };

    this.draw = this.draw.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.setState({ canvas: this.refs.canvas }, () => {
      let columns = [] as any[];
      let context = this.state.canvas.getContext('2d');
      let size = 11;
      let source = chars();
      let width = window.innerWidth;
      let height = window.innerHeight;
      let canvas = this.state.canvas;
      canvas.width = width;
      canvas.height = height;

      let numberOfColumns = Math.floor((width / size) * 3);

      this.setState({ canvas, columns, context, size, source, numberOfColumns }, () => {
        for (let i = 0; i < numberOfColumns; i++) {
          columns.push(0);
        }

        this.draw();
        let interval = setInterval(this.draw, 50 / 1.6);
        this.setState({ interval });

        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
      });
    });
  }

  draw() {
    let context = this.state.context;
    let columns = this.state.columns;
    let numberOfColumns = this.state.numberOfColumns;

    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    context.fillStyle = '#009a22';
    context.font = '400 16px Matrix';

    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      let index = Math.floor(Math.random() * this.state.source.length);
      let character = this.state.source[index];
      let positionX = columnIndex * this.state.size;
      let positionY = columns[columnIndex] * this.state.size;

      context.fillText(character, positionX, positionY);
      if (positionY >= this.state.canvas.height && Math.random() > 1 - 0.0075) {
        columns[columnIndex] = 0;
      }
      columns[columnIndex]++;
    }

    this.setState({ context, columns });
  }

  updateDimensions() {
    let canvas = this.state.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  render() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 50,
        }}
      >
        <canvas ref='canvas' />
      </div>
    );
  }
}

// stolen
