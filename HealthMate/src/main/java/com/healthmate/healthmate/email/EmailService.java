package com.healthmate.healthmate.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    @Async
    public void senEmail(String to  ,String subject, String username,String confirmUrl,String codeConfirmation) throws MessagingException {
        log.info("code"+codeConfirmation);
        String templateName = EmailTemplateName.CONFIRM_TEMPLATE.getValue();
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, MULTIPART_MODE_MIXED, UTF_8.name());
        Map<String,Object> map= new HashMap<>();
        map.put("username",username);
        map.put("confirmUrl",confirmUrl);
        map.put("confirmationCode",codeConfirmation);
        Context context = new Context();
        context.setVariables(map);
        messageHelper.setSubject(subject);

        messageHelper.setTo("bjaouiala3@gmail.com");
        messageHelper.setTo("bjaouiala3@gmail.com");
        String template = templateEngine.process(templateName,context);
        messageHelper.setText(template,true);
        javaMailSender.send(message);



    }

}
