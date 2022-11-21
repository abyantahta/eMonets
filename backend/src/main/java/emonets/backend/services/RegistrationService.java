package emonets.backend.services;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import emonets.backend.dto.GantiPasswordData;
import emonets.backend.dto.RegisterData;
import emonets.backend.dto.RegisterTokenData;
import emonets.backend.dto.ResponseData;
import emonets.backend.email.EmailSender;
import emonets.backend.models.AppUser;
import emonets.backend.models.AppUserRole;
import emonets.backend.models.ConfirmationToken;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {
    
    private final AppUserService appUserService;
    private final EmailSender emailSender;
    private final ConfirmationTokenService confirmationTokenService;

    public ResponseData<?> register(RegisterData registerData){
        ResponseData<?> responseData = new ResponseData<>();
        //mendapatkan AppUser dari registerData
        AppUser user = new AppUser(
            registerData.getUsername(),
            registerData.getEmail(),
            registerData.getPassword(),
            AppUserRole.USER
        );

        RegisterTokenData registerTokenData =  appUserService.signUpUser(user);
        if(registerTokenData.isUserExist()){
            responseData.setStatus(false);
            responseData.setPayload(null);
            responseData.getMessages().add("tidak dapat registrasi menggunakan email ini");
        }
        else{
            //ekstrak token
            String token = registerTokenData.getToken();

            //buat link/url menuju endpoint confirm
            String url = "http://localhost:8080/api/confirm?token="+token;

            //send email yang berisi link aktivasi
            try {
                emailSender.send(
                    registerData.getEmail(),
                    buildEmail(user.getName(), url)
                );  
            } catch (Exception e) {
                appUserService.deleteAppUserByEmail(registerData.getEmail());
                responseData.setStatus(false);
                responseData.setPayload(null);
                responseData.getMessages().add(e.getMessage());
            }


            //lengkapi responseData
            responseData.setStatus(true);
            responseData.setPayload(null);
            responseData.getMessages().add("registrasi berhasil, silahkan cek email anda");
        }

        return responseData;
    }

    public ResponseData<String> gantiPassword(GantiPasswordData gantiPasswordData){
        ResponseData<String> responseData = new ResponseData<>();
        //ambil Register Token Data
        RegisterTokenData registerTokenData = appUserService.gantiPassword(gantiPasswordData.getEmail());

        //if user exist
        if(registerTokenData.isUserExist()){
            //get token from register token data
            String token = registerTokenData.getToken();

            //concat url + token
            String url = "http://localhost:8080/api/confirmgantipassword?token="+token;

            //send email yang berisi link aktivasi
            emailSender.send(
                gantiPasswordData.getEmail(),
                buildEmail2(url)
            );

            //lengkapi respon
            responseData.setStatus(true);
            responseData.getMessages().add("berhasil");
            responseData.setPayload(token);
        }
        //if user not exist
        else{
            //lengkapi respon
            responseData.setStatus(false);
            responseData.getMessages().add("user tidak ditemukan");
            responseData.setPayload(null);
        }
        return responseData;
            
    }

    @Transactional
    public String confirmToken(String token){
        //mengambil token sekaligus cek keberadaan token
        ConfirmationToken confirmationToken = confirmationTokenService
            .getToken(token)
            .orElseThrow(()-> new IllegalStateException("token tidak ditemukan"));
        
        //cek sudah atau belum konfirmasi jika sudah maka throw ex, belum maka lanjut
        if(confirmationToken.getConfirmedAt() != null){
            throw new IllegalStateException("email sudah terkonfirmasi");
        }

        //set token terkonfirmasi sampai ke database
        confirmationTokenService.setConfirmedAt(token);

        //enable appuser terkait sampai ke database
        appUserService.enableAppUser(
            confirmationToken.getAppUser().getEmail()
        );
        
        //selesai
        return "http://localhost:3000/login";
    }

    public ResponseData<String> confirmGantiPasswordToken(String token){
        //mengambil token sekaligus cek keberadaan token
        ConfirmationToken confirmationToken = confirmationTokenService
        .getToken(token)
        .orElseThrow(()-> new IllegalStateException("token tidak ditemukan"));

        //cek sudah atau belum konfirmasi jika sudah maka throw ex, belum maka lanjut
        if(confirmationToken.getConfirmedAt() != null){
            throw new IllegalStateException("email sudah terkonfirmasi");
        }
        
        //set token terkonfirmasi sampai ke database
        confirmationTokenService.setConfirmedAt(token);

        //dapatkan user dari token
        AppUser user = confirmationTokenService.getAppUserByToken(token);

        //buat token lagi
        String tokenSend = UUID.randomUUID().toString();

        //buat dan save confirmation token
        ConfirmationToken confirmationTokenSend = new ConfirmationToken(
            tokenSend,
            LocalDateTime.now(),
            user
        );

        //save confirmation token
        confirmationTokenService.saveConfirmationToken(confirmationTokenSend);

        ResponseData<String> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(tokenSend);
        responseData.getMessages().add("password dapat diubah");

        return responseData;
    }

    // public ResponseData<?> gantiPasswordAction(GPActionData gpActionData){
    //     //mengambil token sekaligus cek keberadaan token
    //     ConfirmationToken confirmationToken = confirmationTokenService
    //     .getToken(gpActionData.getToken())
    //     .orElseThrow(()-> new IllegalStateException("token tidak ditemukan"));

    //     //cek sudah atau belum konfirmasi jika sudah maka throw ex, belum maka lanjut
    //     if(confirmationToken.getConfirmedAt() == null){
    //         throw new IllegalStateException("email belum dikonfirmasi");
    //     }
    //     else{

    //     }
    // }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n  <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
    private String buildEmail2(String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi ,</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you. Please click on the below link to change your password: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Change password</a> </p></blockquote>\n  <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
}
