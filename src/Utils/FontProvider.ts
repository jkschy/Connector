import {QFont} from "@nodegui/nodegui";

class FontProvider {
    private fonts: Map<Fonts, QFont> = new Map();
    private static INSTANCE: FontProvider

    private constructor() {
        const titleFont = new QFont("roboto", 50, 300)
        const subtitleFont = new QFont("roboto", 10, 100)
        const buttonFont = new QFont("roboto", 30, 300);
        const sendButtonFont = new QFont("roboto", 15, 200);
        const messageFont = new QFont("roboto", 18, 200);
        const inputFont = new QFont("roboto", 18, 200);

        this.fonts.set(Fonts.Title, titleFont)
        this.fonts.set(Fonts.Subtitle, subtitleFont)
        this.fonts.set(Fonts.Button, buttonFont)
        this.fonts.set(Fonts.Message, messageFont)
        this.fonts.set(Fonts.SendButton, sendButtonFont)
        this.fonts.set(Fonts.Input, inputFont)
    }


    public static getFont(font: Fonts): QFont {
        if (!FontProvider.INSTANCE) {
            FontProvider.INSTANCE = new FontProvider();
        }
        const foundFont = FontProvider.INSTANCE.fonts.get(font)

        if (font) {
            // @ts-ignore
            return foundFont
        } else {
            return new QFont("roboto", 20, 100)
        }
    }
}

export enum Fonts {
    Title,
    Subtitle,
    Button,
    Message,
    SendButton,
    Input
}

export default FontProvider