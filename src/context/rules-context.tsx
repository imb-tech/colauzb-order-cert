import http from "@/services/http";
import { createContext, ReactNode, useEffect, useState } from "react";

type State = {
    rules: Rule[]
    open?: boolean
    setLang?: (v: string) => void
    toggleLang?: () => void
}

const defaultValue: State = {
    rules: []
}

export const RulesContext = createContext(defaultValue)

export default function RuleProvider({ children }: { children: ReactNode }) {
    const [rules, setRules] = useState<Rule[]>([])
    const [_, setLang] = useState('')
    const [open, setOpen] = useState<boolean>(false)

    async function getRules() {
        const resp = await http.get<Rule[]>('common/roles/')
        if (resp.status == 200) {
            setRules(resp.data?.sort((a, b) => a.id - b.id))
        }
    }

    function toggleLang() {
        setOpen(false)
        getRules()
    }

    useEffect(() => {
        setOpen(true)
        getRules()
    }, [])

    return <RulesContext.Provider value={{ rules, setLang, toggleLang, open }}>{children}</RulesContext.Provider>
}


export interface Rule {
    id: 1,
    created_at: string
    updated_at: string
    title: string
    description: string
    image: null | string
}