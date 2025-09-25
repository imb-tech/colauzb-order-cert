import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { RulesContext } from "@/context/rules-context"
import { useContext } from "react"
import { useTranslation } from "react-i18next"

export function LanguageModal() {
    const { i18n } = useTranslation()
    const { open, toggleLang } = useContext(RulesContext)

    function handleSelect(val: string) {
        i18n.changeLanguage(val)
        toggleLang()
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tilni tanlang</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <button
                        className="bg-secondary py-2 rounded-md"
                        onClick={() => handleSelect("uz")}
                    >
                        O'zbekcha
                    </button>
                    <button
                        className="bg-secondary py-2 rounded-md"
                        onClick={() => handleSelect("kr")}
                    >
                        Ўзбекча
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
