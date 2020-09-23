import { AvPanel, AvStandardGrabbable, AvTransform, DefaultLanding } from '@aardvarkxr/aardvark-react';
import { Av, g_builtinModelBox } from '@aardvarkxr/aardvark-shared';
import bind from 'bind-decorator';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

enum watchDisplayType {
	Time,
	Date,
  }
  
interface WatchState {
watchDisplayTypeInstance: watchDisplayType;
watchDisplay: string;
}

class WatchGadget extends React.Component< {}, WatchState >
{
  constructor(props: any) {
    super(props);
    this.state = {
      watchDisplayTypeInstance: watchDisplayType.Time,
      watchDisplay: "",
    };
  }

  componentDidMount() {
    setInterval(this.getTime, 1000);
  }

  @bind
  private getTime() {
    switch (this.state.watchDisplayTypeInstance) {
      case watchDisplayType.Time:
        this.setState({ watchDisplay: new Date().toLocaleTimeString() });
        break;

      case watchDisplayType.Date:
        this.setState({
          watchDisplay: new Date().toLocaleDateString(undefined, {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          }),
        });
        break;

      default:
        break;
    }
  }

  @bind
  public changeDisplay() {
    this.state.watchDisplayTypeInstance == watchDisplayType.Date
      ? this.setState({ watchDisplayTypeInstance: watchDisplayType.Time })
      : this.setState({ watchDisplayTypeInstance: watchDisplayType.Date });
  }

	public render()
	{
		return (
			<div>
			<AvStandardGrabbable modelUri={"./models/watch.glb"} modelScale={0.03}>
			  <AvTransform
				translateX={-0.012}
				translateY={0.056}
				translateZ={0.00375}
				rotateX={-90}
				uniformScale={0.2}
			  >
				<AvPanel widthInMeters={1.23} interactive={true}>
				  <div className="watch" onMouseDown={this.changeDisplay}>
					{this.state.watchDisplay}
				  </div>
				</AvPanel>
			  </AvTransform>
			</AvStandardGrabbable>
		  </div>
		);
	}
}

let main = Av() ? <WatchGadget/> : <DefaultLanding/>
ReactDOM.render( main, document.getElementById( "root" ) );
