import {QFont} from "@nodegui/nodegui";

class FontProvider {
    private fonts: Map<Fonts, QFont> = new Map();
    private static INSTANCE: FontProvider

    private constructor() {
        const titleFont = new QFont("roboto", 50, 300)
        const subtitleFont = new QFont("roboto", 10, 100)
        const buttonFont = new QFont("roboto", 30, 300);

        this.fonts.set(Fonts.Title, titleFont)
        this.fonts.set(Fonts.Subtitle, subtitleFont)
        this.fonts.set(Fonts.Button, buttonFont)
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
}

export default FontProvider