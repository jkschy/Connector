import {QFont} from "@nodegui/nodegui";

class FontProvider {
    private fonts: Map<Fonts, QFont> = new Map();
    private static INSTANCE: FontProvider

    private constructor() {
        const titleFont = new QFont("Roboto", 50, 300)
        const subtitleFont = new QFont("Roboto", 10, 100)
        const buttonFont = new QFont("Roboto", 30, 300);
        const sendButtonFont = new QFont("Roboto", 15, 200);
        const messageFont = new QFont("Roboto", 18, 200);
        const inputFont = new QFont("Roboto", 18, 200);
        const iconFont = new QFont("Roboto", 60, 300);

        this.fonts.set(Fonts.Title, titleFont)
        this.fonts.set(Fonts.Subtitle, subtitleFont)
        this.fonts.set(Fonts.Button, buttonFont)
        this.fonts.set(Fonts.Message, messageFont)
        this.fonts.set(Fonts.SendButton, sendButtonFont)
        this.fonts.set(Fonts.Input, inputFont)
        this.fonts.set(Fonts.Icon, iconFont);
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
    Input,
    Icon
}

export default FontProvider