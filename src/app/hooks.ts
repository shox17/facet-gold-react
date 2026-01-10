import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// Tells TypeScript the specific types for dispatch and state
export const useAppDispatch = () => useDispatch<AppDispatch>(); 
// TypeScript automatically knows the structure of your state argument within the selector function
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
