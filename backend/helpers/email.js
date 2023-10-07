import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;
    
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "23dcd049226904",
            pass: "3d10316fac4e23"
        }
    });

    // INF email

    const info = await transport.sendMail({
        from: '"UpTAsk - Administrador de proyectps" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Cmprueba tu cuenta",
        text: "Comprueba tu cuenta en Uptask",
        html: `<p>Hola: ${nombre}, Comprueba tu cuenta en UpTask </p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguinte enlace:
        
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>

        <p>Si no creaste esta cuenta, puedes ignorar el mensaje</p>
        
        
        `
    })
}