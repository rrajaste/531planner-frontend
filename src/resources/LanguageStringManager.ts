import { Estonian } from "./translations/estonian"
import { English } from "./translations/english"
import { ICulture } from '@/domain/Culture'

export default class ResourceManager {
    private static readonly estonian: string = "et-EE";
    private static readonly english: string = "en-GB";

    static getTranslation(culture: ICulture) {
        if (culture.code === this.estonian) {
            return Estonian
        }
        // english as default fallback language

        return English
    }
}
