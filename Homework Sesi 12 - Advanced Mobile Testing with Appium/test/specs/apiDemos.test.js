describe('Tugas Digital Skola - Mobile Automation', () => {
    it('Skenario Input Name dan Password di Text Entry Dialog', async () => {
        // 1. Memastikan aplikasi terbuka (Package Name ApiDemos)
        await browser.activateApp('io.appium.android.apis');
        
        // Tunggu sebentar agar aplikasi siap
        await browser.pause(3000);

        // 2. Klik menu "App"
        // Menggunakan UiSelector Text untuk akurasi tinggi
        const menuApp = await $('android=new UiSelector().text("App")');
        await menuApp.waitForDisplayed({ timeout: 15000 });
        await menuApp.click();

        // 3. Klik menu "Alert Dialogs"
        const menuAlert = await $('android=new UiSelector().text("Alert Dialogs")');
        await menuAlert.waitForDisplayed({ timeout: 10000 });
        await menuAlert.click();

        // 4. Scroll dan Klik "Text Entry dialog"
        // Menggunakan Resource ID yang kamu temukan di Inspector (io.appium.android.apis:id/text_entry_button)
        const textEntryId = 'io.appium.android.apis:id/text_entry_button';
        const scrollSelector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("${textEntryId}"))`;
        
        const textEntryMenu = await $(`android=${scrollSelector}`);
        await textEntryMenu.waitForExist({ timeout: 10000 });
        await textEntryMenu.click();

        // 5. Isi data Name dan Password
        // Menggunakan ID akurat: username_edit dan password_edit
        const nameField = await $('id:io.appium.android.apis:id/username_edit');
        const passwordField = await $('id:io.appium.android.apis:id/password_edit');

        // Input Nama
        await nameField.waitForDisplayed({ timeout: 10000 });
        await nameField.click(); // Klik agar kursor aktif
        await nameField.setValue("Budi Digital Skola");
        
        // Input Password
        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.click();
        await passwordField.setValue("Password123");

        // AMBIL SCREENSHOT SAAT DATA TERISI (SEBELUM KLIK OK)
        await browser.saveScreenshot('./screenshot_input_terisi.png');

        // 6. Klik tombol OK 
        // ID standar untuk tombol positif pada dialog Android
        const okButton = await $('id:android:id/button1');
        await okButton.waitForDisplayed({ timeout: 5000 });
        await okButton.click();

        // 7. Sembunyikan keyboard jika masih muncul (opsional agar screenshot bersih)
        if (await browser.isKeyboardShown()) {
            await browser.hideKeyboard();
        }

        // 8. Simpan Screenshot bukti keberhasilan
        await browser.saveScreenshot('./laporan_tugas_berhasil.png');
        
        console.log("--- TEST BERHASIL: DATA TELAH DIINPUT DAN SCREENSHOT DIAMBIL ---");
    });
});