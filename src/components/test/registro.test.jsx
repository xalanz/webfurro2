import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Registro from '../page/Registro';

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => jest.fn(),
    };
});

describe('Registro component', () => {
    it('renderiza el formulario de registro correctamente', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

    

        // Verifica que todos los campos requeridos están presentes
        expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    });

    it('permite ingresar datos en el formulario', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        // Obtiene los campos del formulario
        const nombreInput = screen.getByLabelText(/Nombre/i);
        const apellidoInput = screen.getByLabelText(/Apellido/i);
        const emailInput = screen.getByLabelText(/Correo Electrónico/i);
        const telefonoInput = screen.getByLabelText(/Teléfono/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);

        // Simula la escritura en los campos
        fireEvent.change(nombreInput, { target: { value: 'Juan' } });
        fireEvent.change(apellidoInput, { target: { value: 'Pérez' } });
        fireEvent.change(emailInput, { target: { value: 'juan@gmail.com' } });
        fireEvent.change(telefonoInput, { target: { value: '+56 9 1234 5678' } });
        fireEvent.change(passwordInput, { target: { value: '12345678' } });

        // Verifica que los valores se actualizaron
        expect(nombreInput.value).toBe('Juan');
        expect(apellidoInput.value).toBe('Pérez');
        expect(emailInput.value).toBe('juan@gmail.com');
        expect(telefonoInput.value).toBe('+56 9 1234 5678');
        expect(passwordInput.value).toBe('12345678');
    });

    it('muestra el botón de crear cuenta', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        // Verifica que el botón de registro está presente
        const registerButton = screen.getByText(/Crear Cuenta/i);
        expect(registerButton).toBeInTheDocument();
        expect(registerButton.tagName).toBe('BUTTON');
        expect(registerButton).toHaveAttribute('type', 'submit');
    });

    it('tiene enlace para iniciar sesión', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        // Verifica que el enlace de login está presente
        const loginLink = screen.getByText(/Inicia sesión aquí/i);
        expect(loginLink).toBeInTheDocument();
        expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
    });

    it('verifica que los campos son requeridos', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        // Verifica que los campos tienen el atributo required
        expect(screen.getByLabelText(/Nombre/i)).toHaveAttribute('required');
        expect(screen.getByLabelText(/Apellido/i)).toHaveAttribute('required');
        expect(screen.getByLabelText(/Correo Electrónico/i)).toHaveAttribute('required');
        expect(screen.getByLabelText(/Teléfono/i)).toHaveAttribute('required');
        expect(screen.getByLabelText(/Contraseña/i)).toHaveAttribute('required');
    });

    it('verifica que el checkbox de términos está presente', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        // Verifica que el checkbox de términos está presente
        const termsCheckbox = screen.getByLabelText(/Acepto los Términos y Condiciones/i);
        expect(termsCheckbox).toBeInTheDocument();
        expect(termsCheckbox).toHaveAttribute('required');
    });
});
