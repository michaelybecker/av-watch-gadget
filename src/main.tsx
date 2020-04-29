import * as React from 'react';
import * as ReactDOM from 'react-dom';

import bind from 'bind-decorator';

import {
	AvGadget, AvTransform, AvPanel, AvGrabbable,
	HighlightType, GrabResponse, AvSphereHandle, AvTransformControl,
	AvPanelAnchor, AvModel
} from '@aardvarkxr/aardvark-react';
import {
	EndpointAddr, AvGrabEvent,
	endpointAddrToString
} from '@aardvarkxr/aardvark-shared';

enum watchDisplayType {
	Time,
	Date
}

interface WatchState {
	watchDisplayTypeInstance: watchDisplayType;
	watchDisplay: string;
}

class WatchGadget extends React.Component<{}, WatchState> {
	constructor(props: any) {
		super(props);
		this.state =
		{
			watchDisplayTypeInstance: watchDisplayType.Time,
			watchDisplay: ""
		};
	}

	componentDidMount() {
		setInterval(this.getTime, 1000);
	}

	@bind public getTime() {
		switch (this.state.watchDisplayTypeInstance) {

			case watchDisplayType.Time:
				this.setState({ watchDisplay: new Date().toLocaleTimeString() });
				break;

			case watchDisplayType.Date:
				this.setState({ watchDisplay: new Date().toLocaleDateString(undefined, { month: "2-digit", day: "2-digit", year: "2-digit" }) });
				break;

			default:
				break;
		}
	}

	@bind public changeDisplay() {

		this.state.watchDisplayTypeInstance == watchDisplayType.Date ?
			this.setState({ watchDisplayTypeInstance: watchDisplayType.Time }) :
			this.setState({ watchDisplayTypeInstance: watchDisplayType.Date });
	}

	public render() {
		let scale = 0.2;

		return (
			<div >
				<div>
					<AvGrabbable dropOnHooks={true}>
						<AvSphereHandle radius={0.1} />
						<AvTransform
							uniformScale={0.2}>
							<AvPanel interactive={true} >
								<div className="Watch"
									onMouseDown={this.changeDisplay}>
									{this.state.watchDisplay}
								</div>
								<AvTransform translateX={.063}
									translateY={-.28}
									translateZ={-.023}>
									<AvModel uri="./models/watch.glb"
										scaleToFit={{
											x: 0.35,
											y: 0.35,
											z: 0.35
										}} />
								</AvTransform>
							</AvPanel>
						</AvTransform>
					</AvGrabbable>
				</div>
			</div >
		)
	}
}

ReactDOM.render(<WatchGadget />, document.getElementById("root"));