import { TurtleState } from '../turtle/TurtleState';

export class TurtleInterpreter {

    execute(
        commands: string,
        turtle: TurtleState,
        step = 1,
        angle = Math.PI / 6,
    ) {

        for (const command of commands) {

            switch (command) {

                case 'F':
                    turtle.step(step);
                    break;

                case '+':
                    turtle.turnLeft(angle);
                    break;

                case '-':
                    turtle.turnRight(angle);
                    break;

                case '&':
                    turtle.pitch(angle);
                    break;

                case '^':
                    turtle.pitch(-angle);
                    break;

                case '\\':
                    turtle.roll(angle);
                    break;

                case '/':
                    turtle.roll(-angle);
                    break;

                case '[':
                    turtle.push();
                    break;

                case ']':
                    turtle.pop();
                    break;
            }
        }
    }
}