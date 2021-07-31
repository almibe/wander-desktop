/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Identifier } from '../lib/ast';
import { Binding } from '../lib/binding';
 
describe('Binding tests', () => {
    let identifier = { type: 'identifier', identifier: 'test' } as Identifier
    let identifier2 = { type: 'identifier', identifier: 'test2' } as Identifier

    test('add single value and read', () => {
        const binding = new Binding();
        binding.bind(identifier, "this is a test");
        let res = binding.read(identifier);
        expect(res).toEqual("this is a test");
        expect(() => binding.read(identifier2)).toThrow();
    })

    test('test scoping', () => {
        const binding = new Binding();
        binding.bind(identifier, "this is a test");
        expect(binding.read(identifier)).toEqual("this is a test");

        binding.addScope();
        expect(binding.read(identifier)).toEqual("this is a test");
        binding.bind(identifier, "this is a test2");
        binding.bind(identifier2, "this is a test3");
        expect(binding.read(identifier)).toEqual("this is a test2");
        expect(binding.read(identifier2)).toEqual("this is a test3");

        binding.removeScope()
        expect(binding.read(identifier)).toEqual("this is a test");
        expect(() => binding.read(identifier2)).toThrow();
    })
});
