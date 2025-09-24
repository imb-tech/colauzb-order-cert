import http from "@/services/http";
import { createContext, ReactNode, useEffect, useState } from "react";

const defaultValue: { rules: Rule[] } = {
    rules: []
}

export const RulesContext = createContext(defaultValue)

export default function RuleProvider({ children }: { children: ReactNode }) {
    const [rules, setRules] = useState<Rule[]>([])

    async function getRules() {
        const resp = await http.get<Rule[]>('common/roles/')
        if (resp.status == 200) {
            setRules(resp.data)
        }
    }

    useEffect(() => {
        getRules()
    }, [])

    return <RulesContext.Provider value={{ rules }}>{children}</RulesContext.Provider>
}


export interface Rule {
    id: 1,
    created_at: string
    updated_at: string
    title: string
    description: string
    image: null | string
}