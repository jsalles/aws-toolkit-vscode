/*!
 * Copyright 2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Python, TypeScript, Tsx } from '../fqn'

export async function readImports(text: string, languageId: string): Promise<string[]> {
    let names: any = {}
    switch (languageId) {
        case 'javascript':
        case 'javascriptreact':
        case 'typescriptreact':
            names = await Tsx.findNames(text)
            break
        case 'python':
            names = await Python.findNames(text)
            break
        case 'typescript':
            names = await TypeScript.findNames(text)
            break
    }
    if (names.fullyQualified === undefined) {
        return []
    }
    const imports = names.fullyQualified?.declaredSymbols
        .map((symbol: { source: string[] }): string => {
            return symbol.source[0].replace('@', '')
        })
        .filter((source: string) => source.length !== 0)
    return imports
}
