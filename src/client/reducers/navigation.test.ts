import reducer from './navigation';
import { toggleSidebar } from '../actions/navigation';

describe('navigation reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual({
            showSidebar: false,
        });
    });

    it('should change sidebar visibility', () => {
        const state1 = reducer(undefined, toggleSidebar());
        expect(state1).toEqual({ showSidebar: true });

        const state2 = reducer(state1, toggleSidebar());
        expect(state2).toEqual({ showSidebar: false });
    });
});
