import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginLayout from '../layout/LoginLayout';

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => jest.fn(),
    };
});

describe('LoginLayout component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza correctamente el formulario de login', () => {
        render(
            <MemoryRouter>
                <LoginLayout />
            </MemoryRouter>
        );
        
        expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    });

    it('verifica que el botón de correo existe', () => {
        render(
            <MemoryRouter>
                <LoginLayout />
            </MemoryRouter>
        );
        
        const emailInput = screen.getByLabelText(/Correo Electrónico/i);
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('required');
    });

    it('tiene enlace de registro', () => {
        render(
            <MemoryRouter>
                <LoginLayout />
            </MemoryRouter>
        );
        
        const registroLink = screen.getByText(/Regístrate aquí/i);
        expect(registroLink).toBeInTheDocument();
        expect(registroLink.closest('a')).toHaveAttribute('href', '/registro');
    });

    it('permite escribir en los campos y enviar formulario', () => {
        render(
            <MemoryRouter>
                <LoginLayout />
            </MemoryRouter>
        );
        
        const emailInput = screen.getByLabelText(/Correo Electrónico/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });
});