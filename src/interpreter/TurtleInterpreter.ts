import type { TurtleSettings } from '../turtle/TurtleSettings';
import { TurtleState } from '../turtle/TurtleState';

export class TurtleInterpreter {

    execute(
        commands: string,
        turtle: TurtleState,
        settings: TurtleSettings
    ) {

        for (const command of commands) {

            switch (command) {

                case 'F':
                    turtle.step(settings.step);
                    break;

                case '+':
                    turtle.turnLeft(settings.angle);
                    break;

                case '-':
                    turtle.turnRight(settings.angle);
                    break;

                case '&':
                    turtle.pitch(settings.angle);
                    break;

                case '^':
                    turtle.pitch(-settings.angle);
                    break;

                case '\\':
                    turtle.roll(settings.angle);
                    break;

                case '/':
                    turtle.roll(-settings.angle);
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