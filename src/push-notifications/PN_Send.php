<?php

namespace easyGastro\push_notifications;

require __DIR__ . '/../vendor/autoload.php';

use ErrorException;
use Exception;
use Minishlink\WebPush\Subscription;
use Minishlink\WebPush\WebPush;

class PN_Send
{
    private WebPush $webPush;

    /**
     * @throws ErrorException
     * @throws Exception
     */
    public function __construct()
    {
        $auth = array(
            'VAPID' => array(
                'subject' => file_get_contents(__DIR__ . '/keys/subject.txt'),
                'publicKey' => file_get_contents(__DIR__ . '/keys/public_key.txt'),
                'privateKey' => file_get_contents(__DIR__ . '/keys/private_key.txt'),
            ),
        );

        $this->webPush = new WebPush($auth);
        $this->webPush->setAutomaticPadding(2048);
    }

    /**
     * @throws ErrorException
     */
    public function send($subscriptions, string $message)
    {
        foreach ($subscriptions as $subscription) {
            $notifications[] = Subscription::create($subscription);
        }

        if (!isset($notifications)) {
            return;
        }

        foreach ($notifications as $notification) {
            $this->webPush->queueNotification(
                $notification,
                $message
            );
        }

        foreach ($this->webPush->flush() as $ignored) {
        }


        // Check sent results
//        foreach ($this->webPush->flush() as $report) {
//            $endpoint = $report->getRequest()->getUri()->__toString();

//            if ($report->isSuccess()) {
//                echo "[v] Message sent successfully for subscription $endpoint.";
//            } else {
//                echo $report->getReason();
//                echo "[x] Message failed to sent for subscription $endpoint: {$report->getReason()}";
//            }
//        }

    }
}