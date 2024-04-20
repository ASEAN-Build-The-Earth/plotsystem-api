/**
 * Loading SVG Style 4 
 * By Nikhil Krishnan from: [https://codepen.io/nikhil8krishnan/pen/rVoXJa] under MIT License
 * @param color the color of the svg
 * @returns an animated loading icon
 */
const Svg = ({color, ...props}) => {
    return (
        <svg version="1.1" 
            data-testid="loader"
            id="L4" x="0px" y="0px" 
            style={{ ...props.style }}
            className={props.className? props.className : null}
            viewBox="-7 40 70 20" enableBackground="new 0 0 0 0">
            <circle fill={color} stroke="none" cx="6" cy="50" r="6">
                <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.1"/>    
            </circle>
            <circle fill={color} stroke="none" cx="26" cy="50" r="6">
                <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite" 
                begin="0.2"/>       
            </circle>
            <circle fill={color} stroke="none" cx="46" cy="50" r="6">
                <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite" 
                begin="0.3"/>     
            </circle>
        </svg>
    );
}

export default function LoadingSvg({fillColor, ...props}) {
    return fillColor ? <Svg color={fillColor} {...props}/> : <Svg color="rgb(60, 67, 80)" {...props}/>;
}